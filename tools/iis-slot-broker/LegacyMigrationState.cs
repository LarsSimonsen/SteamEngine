namespace SteamEngineIisSlotBroker;

public sealed class FileLegacyMigrationState : ILegacyMigrationState
{
    private readonly string _markerPath;

    public FileLegacyMigrationState(string? markerPath = null)
    {
        _markerPath = markerPath
            ?? Path.Combine(BrokerConfiguration.ConfigurationDirectory, "legacy-migration.complete");
    }

    public bool IsCompleted => File.Exists(_markerPath);

    public void MarkCompleted()
    {
        Directory.CreateDirectory(Path.GetDirectoryName(_markerPath)!);
        File.WriteAllText(_markerPath, DateTimeOffset.UtcNow.ToString("O") + Environment.NewLine);
    }
}
