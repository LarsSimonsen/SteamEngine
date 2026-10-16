namespace SteamEngineIisSlotBroker;

public sealed record IisVirtualDirectory(string Name, string Path, string PhysicalPath);

public interface IIisGateway
{
    IReadOnlyList<IisVirtualDirectory> ReadVirtualDirectories();

    void SetPhysicalPath(string virtualDirectoryName, string physicalPath);
}

public interface IDeploymentFileSystem
{
    void ValidateSafeDeploymentDirectory(string destination, string expectedPath);

    void ValidateRequiredFiles(string destination);
}

public sealed class AppCmdFailureException : Exception
{
    public AppCmdFailureException(string message, Exception? innerException = null) : base(message, innerException)
    {
    }
}

public sealed record AuditEvent(
    string CallerSid,
    string CorrelationId,
    string? LeaseIdentifier,
    string? PreviousSlot,
    string? IntendedSlot,
    string Result,
    string ErrorCategory);

public interface IAuditSink
{
    void Record(AuditEvent auditEvent);
}

public interface ILegacyMigrationState
{
    bool IsCompleted { get; }

    void MarkCompleted();
}
