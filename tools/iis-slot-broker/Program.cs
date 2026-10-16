using System.Runtime.InteropServices;

namespace SteamEngineIisSlotBroker;

internal static class Program
{
    private static int Main(string[] args)
    {
        try
        {
            var configuration = BrokerConfiguration.Load();
            var audit = new FileAuditSink(BrokerConfiguration.AuditPath);
            var engine = new BrokerEngine(
                configuration,
                new AppCmdIisGateway(),
                new DeploymentFileSystem(),
                audit,
                legacyMigration: new FileLegacyMigrationState());
            var server = new BrokerPipeServer(configuration, engine, audit);

            if (args.Contains("--console", StringComparer.Ordinal))
            {
                using var cancellation = new CancellationTokenSource();
                Console.CancelKeyPress += (_, eventArgs) =>
                {
                    eventArgs.Cancel = true;
                    cancellation.Cancel();
                };
                server.RunAsync(cancellation.Token).GetAwaiter().GetResult();
                return 0;
            }

            return WindowsServiceHost.Run(server);
        }
        catch (Exception error)
        {
            Console.Error.WriteLine($"SteamEngineIisSlotBroker failed to start: {error.Message}");
            return 1;
        }
    }
}

internal static class WindowsServiceHost
{
    private const uint ServiceWin32OwnProcess = 0x00000010;
    private const uint ServiceRunning = 0x00000004;
    private const uint ServiceStartPending = 0x00000002;
    private const uint ServiceStopPending = 0x00000003;
    private const uint ServiceStopped = 0x00000001;
    private const uint ServiceAcceptStop = 0x00000001;
    private const uint ServiceAcceptShutdown = 0x00000004;
    private const uint ControlStop = 0x00000001;
    private const uint ControlShutdown = 0x00000005;
    private const int ErrorFailedServiceControllerConnect = 1063;

    private static BrokerPipeServer? _server;
    private static CancellationTokenSource? _cancellation;
    private static Task? _serverTask;
    private static IntPtr _statusHandle;
    private static readonly ServiceMainDelegate ServiceMainCallback = ServiceMain;
    private static readonly ServiceControlHandlerEx ServiceControlCallback = ServiceControl;

    public static int Run(BrokerPipeServer server)
    {
        _server = server;
        var table = new[]
        {
            new ServiceTableEntry { ServiceName = "SteamEngineIisSlotBroker", ServiceMain = ServiceMainCallback },
            new ServiceTableEntry(),
        };
        if (StartServiceCtrlDispatcher(table)) return 0;

        var error = Marshal.GetLastWin32Error();
        if (error == ErrorFailedServiceControllerConnect)
            throw new InvalidOperationException("The broker must be launched by the Windows Service Control Manager.");
        throw new InvalidOperationException($"The broker could not connect to the Service Control Manager ({error}).");
    }

    private static void ServiceMain(uint argumentCount, IntPtr arguments)
    {
        _statusHandle = RegisterServiceCtrlHandlerEx("SteamEngineIisSlotBroker", ServiceControlCallback, IntPtr.Zero);
        if (_statusHandle == IntPtr.Zero) return;
        ReportStatus(ServiceStartPending, 0, 10_000);
        _cancellation = new CancellationTokenSource();
        _serverTask = _server!.RunAsync(_cancellation.Token);
        ReportStatus(ServiceRunning, 0, 0);
        try
        {
            _serverTask.GetAwaiter().GetResult();
        }
        catch (OperationCanceledException) when (_cancellation.IsCancellationRequested)
        {
        }
        finally
        {
            ReportStatus(ServiceStopped, 0, 0);
            _cancellation.Dispose();
        }
    }

    private static uint ServiceControl(uint control, uint eventType, IntPtr eventData, IntPtr context)
    {
        if (control is ControlStop or ControlShutdown)
        {
            ReportStatus(ServiceStopPending, 0, 10_000);
            _cancellation?.Cancel();
        }
        return 0;
    }

    private static void ReportStatus(uint currentState, uint win32ExitCode, uint waitHint)
    {
        var status = new ServiceStatus
        {
            ServiceType = ServiceWin32OwnProcess,
            CurrentState = currentState,
            ControlsAccepted = currentState == ServiceRunning ? ServiceAcceptStop | ServiceAcceptShutdown : 0,
            Win32ExitCode = win32ExitCode,
            WaitHint = waitHint,
        };
        _ = SetServiceStatus(_statusHandle, ref status);
    }

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    private struct ServiceTableEntry
    {
        public string? ServiceName;
        public ServiceMainDelegate? ServiceMain;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct ServiceStatus
    {
        public uint ServiceType;
        public uint CurrentState;
        public uint ControlsAccepted;
        public uint Win32ExitCode;
        public uint ServiceSpecificExitCode;
        public uint CheckPoint;
        public uint WaitHint;
    }

    [UnmanagedFunctionPointer(CallingConvention.Winapi)]
    private delegate void ServiceMainDelegate(uint argumentCount, IntPtr arguments);

    [UnmanagedFunctionPointer(CallingConvention.Winapi)]
    private delegate uint ServiceControlHandlerEx(uint control, uint eventType, IntPtr eventData, IntPtr context);

    [DllImport("advapi32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern bool StartServiceCtrlDispatcher([In] ServiceTableEntry[] serviceTable);

    [DllImport("advapi32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern IntPtr RegisterServiceCtrlHandlerEx(
        string serviceName,
        ServiceControlHandlerEx handler,
        IntPtr context);

    [DllImport("advapi32.dll", SetLastError = true)]
    private static extern bool SetServiceStatus(IntPtr serviceStatusHandle, ref ServiceStatus serviceStatus);
}
