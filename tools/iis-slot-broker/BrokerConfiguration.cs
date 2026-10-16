using System.Security.Principal;
using System.Text.Json;

namespace SteamEngineIisSlotBroker;

public sealed record BrokerConfiguration(
    string VirtualDirectoryName,
    string AuthorizedCallerSid,
    string BluePath,
    string GreenPath,
    string? LegacyPublicPath = null)
{
    public const int ConfigurationVersion = 1;
    public const string PipeName = "SteamEngineIisSlotBroker";
    public const int LeaseLifetimeSeconds = 300;

    public static string ConfigurationDirectory => Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
        "SteamEngineIisSlotBroker");

    public static string ConfigurationPath => Path.Combine(ConfigurationDirectory, "config.json");

    public static string AuditPath => Path.Combine(ConfigurationDirectory, "broker.log");

    public string GetPath(string slot) => slot switch
    {
        "blue" => BluePath,
        "green" => GreenPath,
        "legacy-public" when LegacyPublicPath is not null => LegacyPublicPath,
        _ => throw new ArgumentException($"Unknown broker slot '{slot}'.", nameof(slot)),
    };

    public void Validate()
    {
        if (string.IsNullOrWhiteSpace(VirtualDirectoryName) || VirtualDirectoryName.Length > 512)
            throw new InvalidDataException("The pinned IIS virtual-directory identity is invalid.");

        try
        {
            _ = new SecurityIdentifier(AuthorizedCallerSid);
        }
        catch (Exception error) when (error is ArgumentException or PlatformNotSupportedException)
        {
            throw new InvalidDataException("The authorized caller SID is invalid.", error);
        }

        ValidatePath(BluePath, "blue");
        ValidatePath(GreenPath, "green");
        if (LegacyPublicPath is not null) ValidatePath(LegacyPublicPath, "legacy public");
        if (PathsMatch(BluePath, GreenPath)) throw new InvalidDataException("Blue and green paths must differ.");
        if (LegacyPublicPath is not null
            && (PathsMatch(LegacyPublicPath, BluePath) || PathsMatch(LegacyPublicPath, GreenPath)))
            throw new InvalidDataException("The legacy public path must differ from both slots.");
    }

    public static BrokerConfiguration Load(string? path = null)
    {
        var configurationPath = path ?? ConfigurationPath;
        var json = File.ReadAllText(configurationPath);
        using var document = JsonDocument.Parse(
            json,
            new JsonDocumentOptions { CommentHandling = JsonCommentHandling.Disallow });
        var root = document.RootElement;
        if (root.ValueKind != JsonValueKind.Object)
            throw new InvalidDataException("Broker configuration must be an object.");

        var properties = root.EnumerateObject().ToArray();
        if (properties.Select(property => property.Name).Distinct(StringComparer.Ordinal).Count() != properties.Length)
            throw new InvalidDataException("Broker configuration contains duplicate fields.");
        var allowed = new HashSet<string>(StringComparer.Ordinal)
        {
            "version", "virtualDirectoryName", "authorizedCallerSid", "bluePath", "greenPath", "legacyPublicPath",
        };
        if (properties.Any(property => !allowed.Contains(property.Name)))
            throw new InvalidDataException("Broker configuration contains an unknown field.");

        var version = RequiredInt(root, "version");
        if (version != ConfigurationVersion)
            throw new InvalidDataException("Unsupported broker configuration version.");
        var configuration = new BrokerConfiguration(
            RequiredString(root, "virtualDirectoryName"),
            RequiredString(root, "authorizedCallerSid"),
            RequiredString(root, "bluePath"),
            RequiredString(root, "greenPath"),
            OptionalString(root, "legacyPublicPath"));
        configuration.Validate();
        return configuration;
    }

    public static void Save(BrokerConfiguration configuration, string path)
    {
        configuration.Validate();
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        var json = JsonSerializer.Serialize(new
        {
            version = ConfigurationVersion,
            virtualDirectoryName = configuration.VirtualDirectoryName,
            authorizedCallerSid = configuration.AuthorizedCallerSid,
            bluePath = configuration.BluePath,
            greenPath = configuration.GreenPath,
            legacyPublicPath = configuration.LegacyPublicPath,
        }, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(path, json + Environment.NewLine);
    }

    public static bool PathsMatch(string first, string second)
    {
        static string Normalize(string value)
        {
            var fullPath = Path.GetFullPath(value);
            var root = Path.GetPathRoot(fullPath);
            return root is not null && fullPath.Length > root.Length
                ? fullPath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar)
                : fullPath;
        }

        return string.Equals(Normalize(first), Normalize(second), StringComparison.OrdinalIgnoreCase);
    }

    private static void ValidatePath(string path, string label)
    {
        if (string.IsNullOrWhiteSpace(path) || path.Length > 2048 || !Path.IsPathFullyQualified(path)
            || path.StartsWith("\\\\", StringComparison.Ordinal)
            || path.StartsWith("\\\\?\\", StringComparison.Ordinal))
            throw new InvalidDataException($"The {label} path must be an absolute local path.");

        if (!string.Equals(path, Path.GetFullPath(path), StringComparison.OrdinalIgnoreCase))
            throw new InvalidDataException($"The {label} path must be stored in its final absolute form.");
    }

    private static int RequiredInt(JsonElement root, string name)
    {
        if (!root.TryGetProperty(name, out var property) || property.ValueKind != JsonValueKind.Number
            || !property.TryGetInt32(out var value))
            throw new InvalidDataException($"Broker configuration field '{name}' is invalid.");
        return value;
    }

    private static string RequiredString(JsonElement root, string name)
    {
        if (!root.TryGetProperty(name, out var property) || property.ValueKind != JsonValueKind.String
            || string.IsNullOrWhiteSpace(property.GetString()))
            throw new InvalidDataException($"Broker configuration field '{name}' is invalid.");
        return property.GetString()!;
    }

    private static string? OptionalString(JsonElement root, string name)
    {
        if (!root.TryGetProperty(name, out var property) || property.ValueKind == JsonValueKind.Null) return null;
        if (property.ValueKind != JsonValueKind.String || string.IsNullOrWhiteSpace(property.GetString()))
            throw new InvalidDataException($"Broker configuration field '{name}' is invalid.");
        return property.GetString();
    }
}
