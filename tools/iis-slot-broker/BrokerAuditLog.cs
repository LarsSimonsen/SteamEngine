using System.Text;

namespace SteamEngineIisSlotBroker;

public sealed class FileAuditSink : IAuditSink
{
    public const long MaximumLogBytes = 1_048_576;
    private readonly string _path;
    private readonly object _gate = new();

    public FileAuditSink(string path) => _path = path;

    public void Record(AuditEvent auditEvent)
    {
        var line = string.Join(
            "\t",
            DateTimeOffset.UtcNow.ToString("O"),
            Clean(auditEvent.CallerSid),
            Clean(auditEvent.CorrelationId),
            Clean(auditEvent.LeaseIdentifier),
            Clean(auditEvent.PreviousSlot),
            Clean(auditEvent.IntendedSlot),
            Clean(auditEvent.Result),
            Clean(auditEvent.ErrorCategory));
        lock (_gate)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(_path)!);
            RotateIfNeeded();
            File.AppendAllText(_path, line + Environment.NewLine, Encoding.UTF8);
        }
    }

    private void RotateIfNeeded()
    {
        if (!File.Exists(_path) || new FileInfo(_path).Length < MaximumLogBytes) return;
        File.Move(_path, _path + ".1", overwrite: true);
    }

    private static string Clean(string? value) => string.IsNullOrEmpty(value)
        ? "-"
        : value.Replace('\t', ' ').Replace('\r', ' ').Replace('\n', ' ');
}
