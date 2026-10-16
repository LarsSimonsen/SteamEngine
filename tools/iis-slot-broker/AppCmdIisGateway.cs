using System.Diagnostics;
using System.Xml.Linq;

namespace SteamEngineIisSlotBroker;

public sealed class AppCmdIisGateway : IIisGateway
{
    private static string FixedAppCmdPath => Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.Windows),
        "System32",
        "inetsrv",
        "appcmd.exe");

    public IReadOnlyList<IisVirtualDirectory> ReadVirtualDirectories()
    {
        var xml = Run(["list", "vdir", "/xml"]);
        try
        {
            var document = XDocument.Parse(xml, LoadOptions.PreserveWhitespace);
            return document.Descendants("VDIR")
                .Select(element => new IisVirtualDirectory(
                    Attribute(element, "VDIR.NAME") ?? Attribute(element, "name") ?? string.Empty,
                    Attribute(element, "path") ?? string.Empty,
                    Attribute(element, "physicalPath") ?? string.Empty))
                .ToArray();
        }
        catch (Exception error) when (error is not AppCmdFailureException)
        {
            throw new AppCmdFailureException("AppCmd returned invalid IIS virtual-directory XML.", error);
        }
    }

    public void SetPhysicalPath(string virtualDirectoryName, string physicalPath)
    {
        _ = Run(["set", "vdir", virtualDirectoryName, $"/physicalPath:{physicalPath}"]);
    }

    private static string? Attribute(XElement element, string name) => element.Attributes()
        .FirstOrDefault(attribute => string.Equals(attribute.Name.LocalName, name, StringComparison.Ordinal))?.Value;

    private static string Run(IReadOnlyList<string> arguments)
    {
        if (!File.Exists(FixedAppCmdPath))
            throw new AppCmdFailureException($"The fixed IIS AppCmd executable was not found at {FixedAppCmdPath}.");

        var startInfo = new ProcessStartInfo
        {
            FileName = FixedAppCmdPath,
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            CreateNoWindow = true,
        };
        foreach (var argument in arguments) startInfo.ArgumentList.Add(argument);

        try
        {
            using var process = Process.Start(startInfo)
                ?? throw new AppCmdFailureException("The fixed IIS AppCmd process could not be started.");
            var stdout = process.StandardOutput.ReadToEnd();
            var stderr = process.StandardError.ReadToEnd();
            process.WaitForExit();
            if (process.ExitCode != 0)
            {
                var detail = string.IsNullOrWhiteSpace(stderr) ? stdout : stderr;
                throw new AppCmdFailureException(
                    $"The fixed IIS AppCmd operation failed with exit code {process.ExitCode}: {detail.Trim()}");
            }

            return stdout;
        }
        catch (AppCmdFailureException)
        {
            throw;
        }
        catch (Exception error)
        {
            throw new AppCmdFailureException("The fixed IIS AppCmd operation could not be executed.", error);
        }
    }
}
