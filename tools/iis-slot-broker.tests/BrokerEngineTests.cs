using System.IO.Pipes;
using System.Security.AccessControl;
using System.Security.Principal;
using SteamEngineIisSlotBroker;

namespace SteamEngineIisSlotBroker.Tests;

public sealed class BrokerEngineTests
{
    private const string CallerSid = "S-1-5-21-111111111-222222222-333333333-1001";
    private static readonly DateTimeOffset InitialTime = new(2026, 8, 9, 12, 0, 0, TimeSpan.Zero);

    [Fact]
    public void BlueActiveCreatesGreenLeaseAndSwitchesOnlyThePinnedVdir()
    {
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\blue");
        var fileSystem = new FakeFileSystem();
        var engine = CreateEngine(gateway, fileSystem);

        var inspection = engine.Handle(
            CallerSid,
            BrokerProtocol.Parse(Bytes("{\"protocolVersion\":1,\"operation\":\"inspect\"}")));

        Assert.True(inspection.Ok);
        Assert.Equal("blue", inspection.ActiveState);
        Assert.Equal("green", inspection.InactiveTarget);
        Assert.NotNull(inspection.LeaseId);
        Assert.NotNull(inspection.LeaseExpiresAt);

        var switched = engine.Handle(CallerSid, BrokerProtocol.Parse(
            Bytes($"{{\"protocolVersion\":1,\"operation\":\"switch\",\"leaseId\":\"{inspection.LeaseId}\"}}")));

        Assert.True(switched.Ok);
        Assert.Equal("blue", switched.PreviousState);
        Assert.Equal("green", switched.IntendedTarget);
        Assert.Equal("green", switched.ActiveState);
        Assert.True(switched.Verified);
        Assert.Equal(("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\green"), gateway.LastSet);
    }

    [Fact]
    public void GreenActiveCreatesBlueLease()
    {
        var engine = CreateEngine(new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\green"));
        var response = Inspect(engine);

        Assert.True(response.Ok);
        Assert.Equal("green", response.ActiveState);
        Assert.Equal("blue", response.InactiveTarget);
    }

    [Fact]
    public void LegacyPublicCreatesInitialBlueLease()
    {
        var engine = CreateEngine(new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\public"));
        var response = Inspect(engine);

        Assert.True(response.Ok);
        Assert.Equal("legacy-public", response.ActiveState);
        Assert.Equal("blue", response.InactiveTarget);
    }

    [Fact]
    public void SuccessfulLegacyMigrationDisablesPublicAsAFutureSource()
    {
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\public");
        var migration = new MemoryLegacyMigrationState();
        var engine = CreateEngine(gateway, legacyMigration: migration);

        var response = Switch(engine, Inspect(engine).LeaseId!);

        Assert.True(response.Ok);
        Assert.True(migration.IsCompleted);
        gateway.SetPhysicalPath("Steam Engine/", "C:\\htdocs\\steamengine\\public");
        var rejected = Inspect(engine);
        Assert.False(rejected.Ok);
        Assert.Equal("unexpected-iis-path", rejected.Error!.Code);
    }

    [Theory]
    [InlineData("missing")]
    [InlineData("duplicate")]
    [InlineData("unexpected")]
    public void InvalidIisStateFailsClosed(string state)
    {
        var roots = state switch
        {
            "missing" => Array.Empty<IisVirtualDirectory>(),
            "duplicate" => new[]
            {
                Root("C:\\htdocs\\steamengine\\.iis-slots\\blue"),
                Root("C:\\htdocs\\steamengine\\.iis-slots\\green"),
            },
            _ => new[] { Root("D:\\unrelated") },
        };
        var response = Inspect(CreateEngine(new FakeIisGateway(roots)));

        Assert.False(response.Ok);
        Assert.Contains(response.Error!.Code, new[] { "iis-state-ambiguous", "unexpected-iis-path" });
    }

    [Fact]
    public void UnknownProtocolOperationsFieldsAndOversizedRequestsAreRejected()
    {
        AssertProtocolRejected("{\"protocolVersion\":1,\"operation\":\"status\"}", "unknown-operation");
        AssertProtocolRejected("{\"protocolVersion\":1,\"operation\":\"inspect\",\"site\":\"x\"}", "unknown-field");
        AssertProtocolRejected("{\"protocolVersion\":1,\"operation\":\"inspect\",\"path\":\"x\"}", "unknown-field");
        AssertProtocolRejected(
            "{\"protocolVersion\":1,\"operation\":\"switch\",\"leaseId\":\"x\",\"target\":\"blue\"}",
            "unknown-field");
        AssertProtocolRejected(
            "{\"protocolVersion\":1,\"operation\":\"switch\",\"leaseId\":\"x\",\"executable\":\"cmd\"}",
            "unknown-field");
        AssertProtocolRejected(
            "{\"protocolVersion\":1,\"operation\":\"switch\",\"leaseId\":\"x\",\"arguments\":[]}",
            "unknown-field");
        var error = Assert.Throws<BrokerProtocolException>(() => BrokerProtocol.Parse(
            new byte[BrokerProtocol.MaxMessageBytes + 1]));
        Assert.Equal("request-too-large", error.Code);
    }

    [Fact]
    public void UnauthorizedCallerIsRejectedBeforeIisAccess()
    {
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\blue");
        var response = CreateEngine(gateway).Handle(
            "S-1-5-21-999999999-999999999-999999999-1001",
            new BrokerRequest(BrokerOperation.Inspect, null));

        Assert.False(response.Ok);
        Assert.Equal("unauthorized-caller", response.Error!.Code);
        Assert.Equal(0, gateway.ReadCount);
    }

    [Fact]
    public void ExpiredReplayedAndConcurrentLeasesAreRejected()
    {
        var now = InitialTime;
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\blue");
        var engine = CreateEngine(
            gateway,
            new FakeFileSystem(),
            () => now);
        var first = Inspect(engine);
        var concurrent = Inspect(engine);
        Assert.False(concurrent.Ok);
        Assert.Equal("concurrent-lease", concurrent.Error!.Code);

        now = now.AddSeconds(BrokerConfiguration.LeaseLifetimeSeconds + 1);
        var expired = Switch(engine, first.LeaseId!);
        Assert.False(expired.Ok);
        Assert.Equal("lease-expired", expired.Error!.Code);

        var second = Inspect(engine);
        Assert.True(second.Ok);
        gateway.SetPhysicalPath("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\green");
        var replay = Switch(engine, second.LeaseId!);
        Assert.False(replay.Ok);
        Assert.Equal("state-changed", replay.Error!.Code);
    }

    [Fact]
    public void StateChangingBetweenInspectionAndSwitchConsumesTheLease()
    {
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\blue")
        {
            ChangePathOnRead = 2,
        };
        var engine = CreateEngine(gateway);
        var inspection = Inspect(engine);
        var response = Switch(engine, inspection.LeaseId!);

        Assert.False(response.Ok);
        Assert.Equal("state-changed", response.Error!.Code);
        Assert.True(Inspect(engine).Ok);
    }

    [Fact]
    public void ReparsePointEscapeAndMissingFilesAreRejectedBeforeAppCmd()
    {
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\blue");
        var fileSystem = new FakeFileSystem { Safe = false };
        var engine = CreateEngine(gateway, fileSystem);
        var response = Switch(engine, Inspect(engine).LeaseId!);

        Assert.False(response.Ok);
        Assert.Equal("reparse-point-rejected", response.Error!.Code);
        Assert.Null(gateway.LastSet);

        fileSystem.Safe = true;
        fileSystem.RequiredFiles = false;
        var next = Inspect(engine);
        var missing = Switch(engine, next.LeaseId!);
        Assert.False(missing.Ok);
        Assert.Equal("required-file-missing", missing.Error!.Code);
        Assert.Null(gateway.LastSet);
    }

    [Fact]
    public void AppCmdFailureConsumesLease()
    {
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\blue")
        {
            SetException = new AppCmdFailureException("fake AppCmd failure"),
        };
        var engine = CreateEngine(gateway);
        var response = Switch(engine, Inspect(engine).LeaseId!);

        Assert.False(response.Ok);
        Assert.Equal("appcmd-failed", response.Error!.Code);
        Assert.True(Inspect(engine).Ok);
    }

    [Fact]
    public void AppCmdSuccessButVerificationMismatchIsReported()
    {
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\blue")
        {
            ApplySet = false,
        };
        var engine = CreateEngine(gateway);
        var response = Switch(engine, Inspect(engine).LeaseId!);

        Assert.False(response.Ok);
        Assert.Equal("verification-mismatch", response.Error!.Code);
    }

    [Fact]
    public void AuditFailurePreventsAppCmdMutation()
    {
        var gateway = new FakeIisGateway("Steam Engine/", "C:\\htdocs\\steamengine\\.iis-slots\\blue");
        var audit = new FakeAudit { ThrowOnRecord = true };
        var engine = CreateEngine(gateway, audit: audit);

        var response = Switch(engine, Inspect(engine).LeaseId!);

        Assert.False(response.Ok);
        Assert.Equal("audit-unavailable", response.Error!.Code);
        Assert.Null(gateway.LastSet);
    }

    [Fact]
    public void FileAuditSinkRotatesAtItsFixedSizeLimit()
    {
        var directory = Path.Combine(Path.GetTempPath(), $"steam-engine-broker-audit-{Guid.NewGuid():N}");
        var path = Path.Combine(directory, "broker.log");
        try
        {
            Directory.CreateDirectory(directory);
            File.WriteAllBytes(path, new byte[FileAuditSink.MaximumLogBytes]);
            new FileAuditSink(path).Record(new AuditEvent(
                CallerSid,
                "correlation",
                null,
                "blue",
                "green",
                "attempting",
                "none"));

            Assert.True(File.Exists(path + ".1"));
            Assert.True(new FileInfo(path).Length < FileAuditSink.MaximumLogBytes);
        }
        finally
        {
            if (Directory.Exists(directory)) Directory.Delete(directory, recursive: true);
        }
    }

    [Fact]
    public void PipeRequestsHaveABoundedDeadline()
    {
        Assert.InRange(BrokerPipeServer.RequestTimeout, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(30));
    }

    [Fact]
    public void PipeFactoryCreatesTheConfiguredDuplexServer()
    {
        using var pipe = BrokerPipeServer.CreatePipe(CallerSid, $"SteamEngineIisSlotBrokerTest-{Guid.NewGuid():N}");

        Assert.Equal(PipeTransmissionMode.Byte, pipe.TransmissionMode);
        Assert.False(pipe.IsConnected);
    }

    [Fact]
    public async Task PipeServerCanReadAnImpersonatingClientsSid()
    {
        var currentSid = WindowsIdentity.GetCurrent().User!.Value;
        var pipeName = $"SteamEngineIisSlotBrokerTest-{Guid.NewGuid():N}";
        using var server = BrokerPipeServer.CreatePipe(currentSid, pipeName);
        using var client = new NamedPipeClientStream(
            ".",
            pipeName,
            PipeDirection.InOut,
            PipeOptions.Asynchronous,
            TokenImpersonationLevel.Impersonation);

        var connection = server.WaitForConnectionAsync();
        await client.ConnectAsync();
        await connection;
        var observedSid = string.Empty;
        server.RunAsClient(() => observedSid = WindowsIdentity.GetCurrent().User!.Value);

        Assert.Equal(currentSid, observedSid);
    }

    [Fact]
    public void PipeAclContainsOnlyTheThreeRequiredPrincipals()
    {
        var security = BrokerPipeServer.CreatePipeSecurity(CallerSid);
        var rules = security.GetAccessRules(true, false, typeof(SecurityIdentifier))
            .Cast<AuthorizationRule>()
            .OfType<AccessRule>()
            .Select(rule => ((SecurityIdentifier)rule.IdentityReference).Value)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        Assert.Equal(
            new[] { CallerSid, "S-1-5-18", "S-1-5-32-544" }.OrderBy(item => item),
            rules.OrderBy(item => item));
    }

    [Fact]
    public void DeploymentGuardRejectsPathEscapesAndUncPaths()
    {
        var fileSystem = new DeploymentFileSystem();
        var escape = Assert.Throws<BrokerValidationException>(() => fileSystem.ValidateSafeDeploymentDirectory(
            "C:\\authorized\\..\\other",
            "C:\\authorized\\slot"));
        Assert.Equal("unsafe-deployment-path", escape.Code);

        var unc = Assert.Throws<BrokerValidationException>(() => fileSystem.ValidateSafeDeploymentDirectory(
            "\\\\server\\share\\slot",
            "C:\\authorized\\slot"));
        Assert.Equal("unsafe-deployment-path", unc.Code);
    }

    private static BrokerEngine CreateEngine(
        FakeIisGateway gateway,
        FakeFileSystem? fileSystem = null,
        Func<DateTimeOffset>? utcNow = null,
        MemoryLegacyMigrationState? legacyMigration = null,
        FakeAudit? audit = null) => new(
        new BrokerConfiguration(
            "Steam Engine/",
            CallerSid,
            "C:\\htdocs\\steamengine\\.iis-slots\\blue",
            "C:\\htdocs\\steamengine\\.iis-slots\\green",
            "C:\\htdocs\\steamengine\\public"),
        gateway,
        fileSystem ?? new FakeFileSystem(),
        audit ?? new FakeAudit(),
        utcNow,
        legacyMigration ?? new MemoryLegacyMigrationState());

    private static BrokerResponse Inspect(BrokerEngine engine) => engine.Handle(
        CallerSid,
        new BrokerRequest(BrokerOperation.Inspect, null));

    private static BrokerResponse Switch(BrokerEngine engine, string leaseId) => engine.Handle(
        CallerSid,
        new BrokerRequest(BrokerOperation.Switch, leaseId));

    private static IisVirtualDirectory Root(string path) => new("Steam Engine/", "/", path);

    private static byte[] Bytes(string value) => System.Text.Encoding.UTF8.GetBytes(value);

    private static void AssertProtocolRejected(string json, string code)
    {
        var error = Assert.Throws<BrokerProtocolException>(() => BrokerProtocol.Parse(Bytes(json)));
        Assert.Equal(code, error.Code);
    }

    private sealed class FakeIisGateway : IIisGateway
    {
        private readonly List<IisVirtualDirectory> _roots;

        public FakeIisGateway(string name, string path) : this(new[] { new IisVirtualDirectory(name, "/", path) })
        {
        }

        public FakeIisGateway(IEnumerable<IisVirtualDirectory> roots) => _roots = roots.ToList();

        public Exception? SetException { get; set; }

        public bool ApplySet { get; set; } = true;

        public int ChangePathOnRead { get; set; }

        public int ReadCount { get; private set; }

        public (string Name, string Path)? LastSet { get; private set; }

        public IReadOnlyList<IisVirtualDirectory> ReadVirtualDirectories()
        {
            ReadCount++;
            if (ReadCount == ChangePathOnRead)
                _roots[0] = _roots[0] with { PhysicalPath = "C:\\htdocs\\steamengine\\.iis-slots\\green" };
            return _roots.ToArray();
        }

        public void SetPhysicalPath(string virtualDirectoryName, string physicalPath)
        {
            if (SetException is not null) throw SetException;
            LastSet = (virtualDirectoryName, physicalPath);
            if (ApplySet) _roots[0] = _roots[0] with { PhysicalPath = physicalPath };
        }
    }

    private sealed class FakeFileSystem : IDeploymentFileSystem
    {
        public bool Safe { get; set; } = true;

        public bool RequiredFiles { get; set; } = true;

        public void ValidateSafeDeploymentDirectory(string destination, string expectedPath)
        {
            if (!Safe) throw new BrokerValidationException("reparse-point-rejected", "fake reparse point");
        }

        public void ValidateRequiredFiles(string destination)
        {
            if (!RequiredFiles) throw new BrokerValidationException("required-file-missing", "fake missing file");
        }
    }

    private sealed class FakeAudit : IAuditSink
    {
        public List<AuditEvent> Events { get; } = new();

        public bool ThrowOnRecord { get; set; }

        public void Record(AuditEvent auditEvent)
        {
            if (ThrowOnRecord) throw new IOException("fake audit failure");
            Events.Add(auditEvent);
        }
    }

    private sealed class MemoryLegacyMigrationState : ILegacyMigrationState
    {
        public bool IsCompleted { get; private set; }

        public void MarkCompleted() => IsCompleted = true;
    }
}
