namespace SteamEngineIisSlotBroker;

public sealed class DeploymentFileSystem : IDeploymentFileSystem
{
    public void ValidateSafeDeploymentDirectory(string destination, string expectedPath)
    {
        var fullDestination = GetSafeLocalPath(destination, expectedPath);
        if (!Directory.Exists(fullDestination))
                throw new BrokerValidationException(
                    "deployment-directory-missing",
                    "The inactive slot directory does not exist.");

        foreach (var component in EnumeratePathComponents(fullDestination))
        {
            if ((File.GetAttributes(component) & FileAttributes.ReparsePoint) != 0)
                throw new BrokerValidationException(
                    "reparse-point-rejected",
                    "The inactive slot path contains a reparse point and was rejected.");
        }
    }

    public void ValidateRequiredFiles(string destination)
    {
        foreach (var name in new[] { "index.html", "web.config" })
        {
            var filePath = Path.Combine(destination, name);
            if (!File.Exists(filePath))
                throw new BrokerValidationException(
                    "required-file-missing",
                    $"The inactive slot is missing required deployment file '{name}'.");
            var attributes = File.GetAttributes(filePath);
            if ((attributes & (FileAttributes.Directory | FileAttributes.ReparsePoint)) != 0)
                throw new BrokerValidationException(
                    "required-file-invalid",
                    $"The inactive slot deployment file '{name}' is not a regular file.");
        }
    }

    private static string GetSafeLocalPath(string destination, string expectedPath)
    {
        if (string.IsNullOrWhiteSpace(destination) || destination.StartsWith("\\\\", StringComparison.Ordinal)
            || destination.StartsWith("\\\\?\\", StringComparison.Ordinal) || !Path.IsPathFullyQualified(destination))
            throw new BrokerValidationException(
                "unsafe-deployment-path",
                "The inactive slot path is not a local absolute path.");

        var fullDestination = Path.GetFullPath(destination);
        if (!BrokerConfiguration.PathsMatch(fullDestination, expectedPath))
            throw new BrokerValidationException(
                "unsafe-deployment-path",
                "The inactive slot path is not an authorized slot.");
        return fullDestination;
    }

    private static IEnumerable<string> EnumeratePathComponents(string path)
    {
        var root = Path.GetPathRoot(path)
            ?? throw new BrokerValidationException(
                "unsafe-deployment-path",
                "The inactive slot path has no local root.");
        yield return root;
        var current = root;
        foreach (var component in path[root.Length..].Split(
                     new[] { Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar },
                     StringSplitOptions.RemoveEmptyEntries))
        {
            current = Path.Combine(current, component);
            yield return current;
        }
    }
}

public sealed class BrokerValidationException : Exception
{
    public BrokerValidationException(string code, string message) : base(message) => Code = code;

    public string Code { get; }
}
