using System.IO.Pipes;
using System.Security.AccessControl;
using System.Security.Principal;

namespace SteamEngineIisSlotBroker;

public sealed class BrokerPipeServer
{
    public static readonly TimeSpan RequestTimeout = TimeSpan.FromSeconds(10);
    private const string AdministratorsSid = "S-1-5-32-544";
    private const string LocalSystemSid = "S-1-5-18";
    private readonly BrokerConfiguration _configuration;
    private readonly BrokerEngine _engine;
    private readonly IAuditSink _audit;

    public BrokerPipeServer(BrokerConfiguration configuration, BrokerEngine engine, IAuditSink audit)
    {
        _configuration = configuration;
        _engine = engine;
        _audit = audit;
    }

    public async Task RunAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            await using var pipe = CreatePipe(_configuration.AuthorizedCallerSid);
            try
            {
                await pipe.WaitForConnectionAsync(cancellationToken).ConfigureAwait(false);
                await ProcessConnectionAsync(pipe, cancellationToken).ConfigureAwait(false);
            }
            catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
            {
                return;
            }
            catch (IOException)
            {
                // A disconnected client is isolated to this one request; the service continues accepting requests.
            }
        }
    }

    public static PipeSecurity CreatePipeSecurity(string authorizedCallerSid)
    {
        var security = new PipeSecurity();
        security.SetAccessRuleProtection(isProtected: true, preserveInheritance: false);
        foreach (var sid in new[] { authorizedCallerSid, AdministratorsSid, LocalSystemSid }
                     .Distinct(StringComparer.OrdinalIgnoreCase))
        {
            security.AddAccessRule(new PipeAccessRule(
                new SecurityIdentifier(sid),
                PipeAccessRights.ReadWrite,
                AccessControlType.Allow));
        }
        return security;
    }

    private async Task ProcessConnectionAsync(NamedPipeServerStream pipe, CancellationToken cancellationToken)
    {
        var correlationId = Guid.NewGuid().ToString("N");
        var callerSid = string.Empty;
        using var requestCancellation = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        requestCancellation.CancelAfter(RequestTimeout);
        try
        {
            callerSid = GetCallerSid(pipe);
            var bytes = await ReadRequestAsync(pipe, requestCancellation.Token).ConfigureAwait(false);
            var request = BrokerProtocol.Parse(bytes);
            var response = _engine.Handle(callerSid, request);
            await WriteResponseAsync(pipe, response, requestCancellation.Token).ConfigureAwait(false);
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            RecordAudit(callerSid, correlationId, "rejected", "request-timeout");
        }
        catch (BrokerProtocolException error)
        {
            RecordAudit(callerSid, correlationId, "rejected", error.Code);
            await WriteResponseAsync(
                pipe,
                BrokerProtocol.Error("unknown", error.Code, error.Message, correlationId),
                cancellationToken).ConfigureAwait(false);
        }
        catch (Exception error) when (error is not OperationCanceledException)
        {
            RecordAudit(callerSid, correlationId, "failed", "protocol-error");
            await WriteResponseAsync(
                pipe,
                BrokerProtocol.Error(
                    "unknown",
                    "protocol-error",
                    "The broker could not process the request.",
                    correlationId),
                cancellationToken).ConfigureAwait(false);
        }
    }

    internal static NamedPipeServerStream CreatePipe(
        string authorizedCallerSid,
        string pipeName = BrokerConfiguration.PipeName) => NamedPipeServerStreamAcl.Create(
        pipeName,
        PipeDirection.InOut,
        1,
        PipeTransmissionMode.Byte,
        PipeOptions.Asynchronous,
        BrokerProtocol.MaxMessageBytes,
        BrokerProtocol.MaxMessageBytes,
        CreatePipeSecurity(authorizedCallerSid),
        HandleInheritability.None);

    private static string GetCallerSid(NamedPipeServerStream pipe)
    {
        var sid = string.Empty;
        pipe.RunAsClient(() => sid = WindowsIdentity.GetCurrent().User?.Value ?? string.Empty);
        return sid;
    }

    private static async Task<byte[]> ReadRequestAsync(NamedPipeServerStream pipe, CancellationToken cancellationToken)
    {
        await using var buffer = new MemoryStream();
        var oneByte = new byte[1];
        while (buffer.Length <= BrokerProtocol.MaxMessageBytes)
        {
            var count = await pipe.ReadAsync(oneByte, cancellationToken).ConfigureAwait(false);
            if (count == 0)
                throw new BrokerProtocolException(
                    "malformed-request",
                    "The broker request ended before a newline.");
            if (oneByte[0] == (byte)'\n') return buffer.ToArray();
            if (oneByte[0] != (byte)'\r') buffer.WriteByte(oneByte[0]);
        }
        throw new BrokerProtocolException("request-too-large", "The broker request is too large.");
    }

    private static async Task WriteResponseAsync(
        NamedPipeServerStream pipe,
        BrokerResponse response,
        CancellationToken cancellationToken)
    {
        var bytes = System.Text.Encoding.UTF8.GetBytes(BrokerProtocol.Serialize(response));
        await pipe.WriteAsync(bytes, cancellationToken).ConfigureAwait(false);
        await pipe.FlushAsync(cancellationToken).ConfigureAwait(false);
    }

    private void RecordAudit(string callerSid, string correlationId, string result, string category)
    {
        try
        {
            _audit.Record(new AuditEvent(callerSid, correlationId, null, null, null, result, category));
        }
        catch
        {
            // A logging failure must not terminate the named-pipe accept loop.
        }
    }
}
