using System.Security.Cryptography;

namespace SteamEngineIisSlotBroker;

public sealed class BrokerEngine
{
    private readonly BrokerConfiguration _configuration;
    private readonly IIisGateway _iis;
    private readonly IDeploymentFileSystem _fileSystem;
    private readonly IAuditSink _audit;
    private readonly ILegacyMigrationState _legacyMigration;
    private readonly Func<DateTimeOffset> _utcNow;
    private readonly object _leaseGate = new();
    private LeaseRecord? _activeLease;

    public BrokerEngine(
        BrokerConfiguration configuration,
        IIisGateway iis,
        IDeploymentFileSystem fileSystem,
        IAuditSink audit,
        Func<DateTimeOffset>? utcNow = null,
        ILegacyMigrationState? legacyMigration = null)
    {
        configuration.Validate();
        _configuration = configuration;
        _iis = iis;
        _fileSystem = fileSystem;
        _audit = audit;
        _legacyMigration = legacyMigration ?? new FileLegacyMigrationState();
        _utcNow = utcNow ?? (() => DateTimeOffset.UtcNow);
    }

    public BrokerResponse Handle(string callerSid, BrokerRequest request)
    {
        var correlationId = Guid.NewGuid().ToString("N");
        if (!string.Equals(callerSid, _configuration.AuthorizedCallerSid, StringComparison.OrdinalIgnoreCase))
        {
            WriteAudit(callerSid, correlationId, null, null, null, "rejected", "unauthorized-caller");
            return BrokerProtocol.Error(
                OperationName(request),
                "unauthorized-caller",
                "The named-pipe caller is not authorized.",
                correlationId);
        }

        return request.Operation switch
        {
            BrokerOperation.Inspect => Inspect(callerSid, correlationId),
            BrokerOperation.Switch => Switch(callerSid, correlationId, request.LeaseId!),
            _ => BrokerProtocol.Error(
                OperationName(request),
                "unknown-operation",
                "The broker operation is not supported.",
                correlationId),
        };
    }

    private BrokerResponse Inspect(string callerSid, string correlationId)
    {
        IisState? state = null;
        try
        {
            lock (_leaseGate)
            {
                state = ReadState();
                if (_activeLease is not null)
                {
                    if (_activeLease.ExpiresAt > _utcNow())
                        throw new BrokerFailureException(
                            "concurrent-lease",
                            "Another deployment lease is already active.");
                    _activeLease = null;
                }

                var leaseId = CreateLeaseId();
                var expiresAt = _utcNow().AddSeconds(BrokerConfiguration.LeaseLifetimeSeconds);
                _activeLease = new LeaseRecord(leaseId, state, expiresAt);
                WriteAudit(callerSid, correlationId, leaseId, state.Slot, state.InactiveSlot, "succeeded", "none");
                return new BrokerResponse(
                    BrokerProtocol.Version,
                    true,
                    "inspect",
                    correlationId,
                    state.Slot,
                    state.InactiveSlot,
                    leaseId,
                    expiresAt);
            }
        }
        catch (BrokerFailureException error)
        {
            WriteAudit(callerSid, correlationId, null, state?.Slot, state?.InactiveSlot, "rejected", error.Code);
            return BrokerProtocol.Error("inspect", error.Code, error.Message, correlationId);
        }
        catch (Exception)
        {
            WriteAudit(callerSid, correlationId, null, state?.Slot, state?.InactiveSlot, "failed", "internal-error");
            return BrokerProtocol.Error(
                "inspect",
                "internal-error",
                "The broker could not inspect IIS safely.",
                correlationId);
        }
    }

    private BrokerResponse Switch(string callerSid, string correlationId, string leaseId)
    {
        LeaseRecord? lease = null;
        try
        {
            lock (_leaseGate)
            {
                lease = ConsumeLease(leaseId);
                var current = ReadState();
                if (!current.Matches(lease.Snapshot))
                    throw new BrokerFailureException(
                        "state-changed",
                        "IIS state changed after inspection; no switch was made.");

                var destination = _configuration.GetPath(lease.Snapshot.InactiveSlot);
                _fileSystem.ValidateSafeDeploymentDirectory(destination, destination);
                _fileSystem.ValidateRequiredFiles(destination);
                RequireAudit(
                    callerSid,
                    correlationId,
                    lease.LeaseId,
                    lease.Snapshot.Slot,
                    lease.Snapshot.InactiveSlot);

                try
                {
                    _iis.SetPhysicalPath(_configuration.VirtualDirectoryName, destination);
                }
                catch (AppCmdFailureException error)
                {
                    throw new BrokerFailureException("appcmd-failed", "IIS rejected the slot switch.", error);
                }

                IisState verified;
                try
                {
                    verified = ReadState();
                }
                catch (BrokerFailureException error)
                {
                    throw new BrokerFailureException(
                        "verification-mismatch",
                        "AppCmd reported success, but the resulting IIS state could not be verified.",
                        error);
                }

                if (!string.Equals(verified.Slot, lease.Snapshot.InactiveSlot, StringComparison.Ordinal)
                    || !BrokerConfiguration.PathsMatch(verified.Root.PhysicalPath, destination))
                    throw new BrokerFailureException(
                        "verification-mismatch",
                        "AppCmd reported success, but IIS did not report the requested slot.");

                if (string.Equals(lease.Snapshot.Slot, "legacy-public", StringComparison.Ordinal))
                {
                    try
                    {
                        _legacyMigration.MarkCompleted();
                    }
                    catch (Exception error)
                    {
                        throw new BrokerFailureException(
                            "legacy-state-failed",
                            "IIS switched, but the legacy-source completion marker could not be stored.",
                            error);
                    }
                }

                WriteAudit(
                    callerSid,
                    correlationId,
                    lease.LeaseId,
                    lease.Snapshot.Slot,
                    lease.Snapshot.InactiveSlot,
                    "succeeded",
                    "none");
                return new BrokerResponse(
                    BrokerProtocol.Version,
                    true,
                    "switch",
                    correlationId,
                    verified.Slot,
                    null,
                    null,
                    null,
                    lease.Snapshot.Slot,
                    lease.Snapshot.InactiveSlot,
                    true);
            }
        }
        catch (BrokerFailureException error)
        {
            WriteAudit(
                callerSid,
                correlationId,
                lease?.LeaseId,
                lease?.Snapshot.Slot,
                lease?.Snapshot.InactiveSlot,
                "rejected",
                error.Code);
            return BrokerProtocol.Error("switch", error.Code, error.Message, correlationId);
        }
        catch (BrokerValidationException error)
        {
            WriteAudit(
                callerSid,
                correlationId,
                lease?.LeaseId,
                lease?.Snapshot.Slot,
                lease?.Snapshot.InactiveSlot,
                "rejected",
                error.Code);
            return BrokerProtocol.Error("switch", error.Code, error.Message, correlationId);
        }
        catch (Exception)
        {
            WriteAudit(
                callerSid,
                correlationId,
                lease?.LeaseId,
                lease?.Snapshot.Slot,
                lease?.Snapshot.InactiveSlot,
                "failed",
                "internal-error");
            return BrokerProtocol.Error(
                "switch",
                "internal-error",
                "The broker could not switch IIS safely.",
                correlationId);
        }
    }

    private IisState ReadState()
    {
        IReadOnlyList<IisVirtualDirectory> roots;
        try
        {
            roots = _iis.ReadVirtualDirectories();
        }
        catch (AppCmdFailureException error)
        {
            throw new BrokerFailureException("iis-read-failed", "The broker could not read IIS.", error);
        }

        var matches = roots.Where(root => string.Equals(root.Path, "/", StringComparison.Ordinal)
                && string.Equals(root.Name, _configuration.VirtualDirectoryName, StringComparison.OrdinalIgnoreCase))
            .ToArray();
        if (matches.Length != 1)
            throw new BrokerFailureException(
                "iis-state-ambiguous",
                "The pinned IIS root virtual directory was missing or ambiguous.");

        var root = matches[0];
        if (string.IsNullOrWhiteSpace(root.PhysicalPath))
            throw new BrokerFailureException("iis-state-invalid", "The pinned IIS root has no physical path.");

        var slot = ClassifyPath(root.PhysicalPath);
        var inactiveSlot = slot switch
        {
            "blue" => "green",
            "green" or "legacy-public" => "blue",
            _ => throw new InvalidOperationException("Unreachable slot classification."),
        };
        return new IisState(root, slot, inactiveSlot);
    }

    private string ClassifyPath(string physicalPath)
    {
        if (BrokerConfiguration.PathsMatch(physicalPath, _configuration.BluePath)) return "blue";
        if (BrokerConfiguration.PathsMatch(physicalPath, _configuration.GreenPath)) return "green";
        if (_configuration.LegacyPublicPath is not null
            && !_legacyMigration.IsCompleted
            && BrokerConfiguration.PathsMatch(physicalPath, _configuration.LegacyPublicPath)) return "legacy-public";
        throw new BrokerFailureException(
            "unexpected-iis-path",
            "The pinned IIS root points outside the authorized public, blue, and green paths.");
    }

    private LeaseRecord ConsumeLease(string leaseId)
    {
        if (_activeLease is null || !string.Equals(_activeLease.LeaseId, leaseId, StringComparison.Ordinal))
            throw new BrokerFailureException(
                "lease-invalid",
                "The deployment lease is missing, expired, or already used.");
        var lease = _activeLease;
        _activeLease = null;
        if (lease.ExpiresAt <= _utcNow())
            throw new BrokerFailureException("lease-expired", "The deployment lease has expired.");
        return lease;
    }

    private static string CreateLeaseId() => Convert.ToHexString(RandomNumberGenerator.GetBytes(24)).ToLowerInvariant();

    private void WriteAudit(
        string callerSid,
        string correlationId,
        string? leaseId,
        string? previousSlot,
        string? intendedSlot,
        string result,
        string errorCategory)
    {
        try
        {
            _audit.Record(new AuditEvent(
                callerSid,
                correlationId,
                leaseId,
                previousSlot,
                intendedSlot,
                result,
                errorCategory));
        }
        catch
        {
            // An audit sink failure must not turn a safe, already completed decision into a retryable mutation.
        }
    }

    private void RequireAudit(
        string callerSid,
        string correlationId,
        string leaseId,
        string previousSlot,
        string intendedSlot)
    {
        try
        {
            _audit.Record(new AuditEvent(
                callerSid,
                correlationId,
                leaseId,
                previousSlot,
                intendedSlot,
                "attempting",
                "none"));
        }
        catch (Exception error)
        {
            throw new BrokerFailureException(
                "audit-unavailable",
                "The broker could not record the required pre-switch audit event; no switch was made.",
                error);
        }
    }

    private static string OperationName(BrokerRequest request) => request.Operation switch
    {
        BrokerOperation.Inspect => "inspect",
        BrokerOperation.Switch => "switch",
        _ => "unknown",
    };

    private sealed record LeaseRecord(string LeaseId, IisState Snapshot, DateTimeOffset ExpiresAt);

    private sealed record IisState(IisVirtualDirectory Root, string Slot, string InactiveSlot)
    {
        public bool Matches(IisState other) =>
            string.Equals(Root.Name, other.Root.Name, StringComparison.OrdinalIgnoreCase)
            && string.Equals(Root.Path, other.Root.Path, StringComparison.Ordinal)
            && BrokerConfiguration.PathsMatch(Root.PhysicalPath, other.Root.PhysicalPath)
            && string.Equals(Slot, other.Slot, StringComparison.Ordinal)
            && string.Equals(InactiveSlot, other.InactiveSlot, StringComparison.Ordinal);
    }
}

public sealed class BrokerFailureException : Exception
{
    public BrokerFailureException(string code, string message, Exception? innerException = null)
        : base(message, innerException) => Code = code;

    public string Code { get; }
}
