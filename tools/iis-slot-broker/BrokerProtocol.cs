using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SteamEngineIisSlotBroker;

public enum BrokerOperation
{
    Inspect,
    Switch,
}

public sealed record BrokerRequest(BrokerOperation Operation, string? LeaseId);

public sealed record BrokerError(
    [property: JsonPropertyName("code")] string Code,
    [property: JsonPropertyName("message")] string Message);

public sealed record BrokerResponse(
    [property: JsonPropertyName("protocolVersion")] int ProtocolVersion,
    [property: JsonPropertyName("ok")] bool Ok,
    [property: JsonPropertyName("operation")] string Operation,
    [property: JsonPropertyName("correlationId")] string CorrelationId,
    [property: JsonPropertyName("activeState")] string? ActiveState = null,
    [property: JsonPropertyName("inactiveTarget")] string? InactiveTarget = null,
    [property: JsonPropertyName("leaseId")] string? LeaseId = null,
    [property: JsonPropertyName("leaseExpiresAt")] DateTimeOffset? LeaseExpiresAt = null,
    [property: JsonPropertyName("previousState")] string? PreviousState = null,
    [property: JsonPropertyName("intendedTarget")] string? IntendedTarget = null,
    [property: JsonPropertyName("verified")] bool? Verified = null,
    [property: JsonPropertyName("error")] BrokerError? Error = null);

public sealed class BrokerProtocolException : Exception
{
    public BrokerProtocolException(string code, string message) : base(message) => Code = code;

    public string Code { get; }
}

public static class BrokerProtocol
{
    public const int Version = 1;
    public const int MaxMessageBytes = 4096;

    private static readonly Encoding StrictUtf8 = new UTF8Encoding(false, true);

    public static BrokerRequest Parse(ReadOnlySpan<byte> bytes)
    {
        if (bytes.Length == 0 || bytes.Length > MaxMessageBytes)
            throw new BrokerProtocolException("request-too-large", "The broker request is empty or too large.");

        string json;
        try
        {
            json = StrictUtf8.GetString(bytes);
        }
        catch (DecoderFallbackException)
        {
            throw new BrokerProtocolException("malformed-request", "The broker request is not valid UTF-8.");
        }

        try
        {
            using var document = JsonDocument.Parse(json, new JsonDocumentOptions
            {
                CommentHandling = JsonCommentHandling.Disallow,
                AllowTrailingCommas = false,
            });
            var root = document.RootElement;
            if (root.ValueKind != JsonValueKind.Object)
                throw new BrokerProtocolException("malformed-request", "The broker request must be a JSON object.");

            var properties = root.EnumerateObject().ToArray();
            if (properties.Select(property => property.Name).Distinct(StringComparer.Ordinal).Count()
                != properties.Length)
                throw new BrokerProtocolException("unknown-field", "Duplicate broker request fields are not allowed.");

            var version = RequiredInt(root, "protocolVersion");
            if (version != Version)
                throw new BrokerProtocolException(
                    "unsupported-version",
                    "Unsupported broker protocol version.");
            var operationName = RequiredString(root, "operation");
            var operation = operationName switch
            {
                "inspect" => BrokerOperation.Inspect,
                "switch" => BrokerOperation.Switch,
                _ => throw new BrokerProtocolException("unknown-operation", "The broker operation is not supported."),
            };

            var allowed = operation == BrokerOperation.Inspect
                ? new[] { "protocolVersion", "operation" }
                : new[] { "protocolVersion", "operation", "leaseId" };
            if (properties.Any(property => !allowed.Contains(property.Name, StringComparer.Ordinal)))
                throw new BrokerProtocolException("unknown-field", "The broker request contains an unknown field.");

            if (operation == BrokerOperation.Inspect) return new BrokerRequest(operation, null);
            var leaseId = RequiredString(root, "leaseId");
            if (leaseId.Length > 256
                || leaseId.Any(character => !(char.IsAsciiLetterOrDigit(character) || character is '-' or '_')))
                throw new BrokerProtocolException("malformed-request", "The broker lease identifier is invalid.");
            return new BrokerRequest(operation, leaseId);
        }
        catch (BrokerProtocolException)
        {
            throw;
        }
        catch (JsonException)
        {
            throw new BrokerProtocolException("malformed-request", "The broker request is not valid JSON.");
        }
    }

    public static string Serialize(BrokerResponse response) => JsonSerializer.Serialize(response) + "\n";

    public static BrokerResponse Error(string operation, string code, string message, string? correlationId = null) =>
        new(
            Version,
            false,
            operation,
            correlationId ?? Guid.NewGuid().ToString("N"),
            Error: new BrokerError(code, message));

    private static int RequiredInt(JsonElement root, string name)
    {
        if (!root.TryGetProperty(name, out var property) || property.ValueKind != JsonValueKind.Number
            || !property.TryGetInt32(out var value))
            throw new BrokerProtocolException("malformed-request", $"The broker field '{name}' is invalid.");
        return value;
    }

    private static string RequiredString(JsonElement root, string name)
    {
        if (!root.TryGetProperty(name, out var property) || property.ValueKind != JsonValueKind.String
            || string.IsNullOrWhiteSpace(property.GetString()))
            throw new BrokerProtocolException("malformed-request", $"The broker field '{name}' is invalid.");
        return property.GetString()!;
    }
}
