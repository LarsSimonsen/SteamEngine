using System.ComponentModel;
using System.IO.Pipes;
using System.Runtime.InteropServices;
using System.Security.Principal;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.Win32.SafeHandles;

namespace SteamEngineIisSlotBrokerClient;

internal static partial class Program
{
    private const string ServiceName = "SteamEngineIisSlotBroker";
    private const string PipeName = "SteamEngineIisSlotBroker";
    private const int ProtocolVersion = 1;
    private const int MaximumMessageBytes = 4096;
    private const int ConnectionTimeoutMilliseconds = 3000;
    private static readonly TimeSpan OperationTimeout = TimeSpan.FromSeconds(15);

    private static int Main(string[] args)
    {
        try
        {
            var request = CreateRequest(args);
            using var cancellation = new CancellationTokenSource(OperationTimeout);
            using var pipe = new NamedPipeClientStream(
                ".",
                PipeName,
                PipeDirection.InOut,
                PipeOptions.Asynchronous,
                TokenImpersonationLevel.Impersonation);
            pipe.Connect(ConnectionTimeoutMilliseconds);
            ServicePipeVerifier.Verify(pipe.SafePipeHandle, ServiceName);
            ExchangeAsync(pipe, request, cancellation.Token).GetAwaiter().GetResult();
            return 0;
        }
        catch (Exception error)
        {
            Console.Error.WriteLine($"Steam Engine IIS slot broker client failed: {error.Message}");
            return 1;
        }
    }

    private static object CreateRequest(string[] args)
    {
        if (args.Length == 1 && string.Equals(args[0], "inspect", StringComparison.Ordinal))
            return new { protocolVersion = ProtocolVersion, operation = "inspect" };
        if (args.Length == 2 && string.Equals(args[0], "switch", StringComparison.Ordinal)
            && LeasePattern().IsMatch(args[1]))
            return new { protocolVersion = ProtocolVersion, operation = "switch", leaseId = args[1] };
        throw new ArgumentException("Expected either 'inspect' or 'switch <opaque-lease-id>'.");
    }

    private static async Task ExchangeAsync(NamedPipeClientStream pipe, object request, CancellationToken cancellation)
    {
        var requestBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(request) + "\n");
        await pipe.WriteAsync(requestBytes, cancellation).ConfigureAwait(false);
        await pipe.FlushAsync(cancellation).ConfigureAwait(false);

        await using var response = new MemoryStream();
        var oneByte = new byte[1];
        while (response.Length <= MaximumMessageBytes)
        {
            var count = await pipe.ReadAsync(oneByte, cancellation).ConfigureAwait(false);
            if (count == 0) throw new IOException("The broker closed the authenticated pipe before replying.");
            if (oneByte[0] == (byte)'\n')
            {
                Console.Out.WriteLine(Encoding.UTF8.GetString(response.ToArray()));
                return;
            }
            if (oneByte[0] != (byte)'\r') response.WriteByte(oneByte[0]);
        }
        throw new InvalidDataException("The broker response exceeded the protocol limit.");
    }

    [GeneratedRegex("^[A-Za-z0-9_-]{1,256}$", RegexOptions.CultureInvariant)]
    private static partial Regex LeasePattern();
}

internal static class ServicePipeVerifier
{
    private const uint ScManagerConnect = 0x0001;
    private const uint ServiceQueryStatus = 0x0004;
    private const int ScStatusProcessInfo = 0;
    private const uint ServiceRunning = 0x00000004;

    public static void Verify(SafePipeHandle pipeHandle, string serviceName)
    {
        if (!GetNamedPipeServerProcessId(pipeHandle, out var pipeServerProcessId))
            throw new Win32Exception(Marshal.GetLastWin32Error(), "Could not identify the named-pipe server.");

        using var serviceManager = OpenSCManager(null, null, ScManagerConnect);
        if (serviceManager.IsInvalid)
            throw new Win32Exception(Marshal.GetLastWin32Error(), "Could not inspect Windows services.");
        using var service = OpenService(serviceManager, serviceName, ServiceQueryStatus);
        if (service.IsInvalid)
            throw new Win32Exception(Marshal.GetLastWin32Error(), "The registered IIS slot broker was not found.");

        var size = Marshal.SizeOf<ServiceStatusProcess>();
        var buffer = Marshal.AllocHGlobal(size);
        try
        {
            if (!QueryServiceStatusEx(service, ScStatusProcessInfo, buffer, size, out _))
                throw new Win32Exception(Marshal.GetLastWin32Error(), "Could not inspect the IIS slot broker service.");
            var status = Marshal.PtrToStructure<ServiceStatusProcess>(buffer);
            if (status.CurrentState != ServiceRunning || status.ProcessId == 0
                || status.ProcessId != pipeServerProcessId)
                throw new InvalidOperationException(
                    "The named-pipe server is not the running SteamEngineIisSlotBroker service.");
        }
        finally
        {
            Marshal.FreeHGlobal(buffer);
        }
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct ServiceStatusProcess
    {
        public uint ServiceType;
        public uint CurrentState;
        public uint ControlsAccepted;
        public uint Win32ExitCode;
        public uint ServiceSpecificExitCode;
        public uint CheckPoint;
        public uint WaitHint;
        public uint ProcessId;
        public uint ServiceFlags;
    }

    private sealed class SafeServiceHandle : SafeHandleZeroOrMinusOneIsInvalid
    {
        private SafeServiceHandle() : base(true)
        {
        }

        protected override bool ReleaseHandle() => CloseServiceHandle(handle);
    }

    [DllImport("kernel32.dll", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool GetNamedPipeServerProcessId(SafePipeHandle pipe, out uint serverProcessId);

    [DllImport("advapi32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern SafeServiceHandle OpenSCManager(string? machineName, string? databaseName, uint access);

    [DllImport("advapi32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern SafeServiceHandle OpenService(
        SafeServiceHandle serviceManager,
        string serviceName,
        uint desiredAccess);

    [DllImport("advapi32.dll", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool QueryServiceStatusEx(
        SafeServiceHandle service,
        int informationLevel,
        IntPtr buffer,
        int bufferSize,
        out int bytesNeeded);

    [DllImport("advapi32.dll", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool CloseServiceHandle(IntPtr serviceHandle);
}
