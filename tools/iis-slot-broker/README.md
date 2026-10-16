# SteamEngineIisSlotBroker

`SteamEngineIisSlotBroker` is a small self-contained Windows service that owns
the only elevated operation needed by a local Steam Engine preview build. It
reads and changes one pinned IIS root virtual directory, and only changes its
`physicalPath` between the pinned blue and green directories.

The installed service does not load code, libraries, configuration, Node, npm,
PowerShell, or scripts from this repository. It uses the fixed system
executable `%windir%\System32\inetsrv\appcmd.exe`. Its configuration is stored
in `%ProgramData%\SteamEngineIisSlotBroker\config.json`, protected for
Administrators and LocalSystem, and its audit log is in the same administrator-owned
directory. The named pipe is local-only and its ACL contains only the configured
caller SID, Administrators, and LocalSystem. The broker still accepts operations
only from the configured caller SID. Normal builds invoke the installed
`SteamEngineIisSlotBrokerClient.exe`; before sending a request, that client
verifies that the connected pipe server's process ID is the running registered
broker service. A process that merely claims the same pipe name is rejected.

The service exposes exactly two JSON-line operations: `inspect` creates one
short-lived, single-use lease and reports the active/inactive slot; `switch`
accepts only the protocol version, operation name, and lease ID. The broker
re-reads IIS, checks the lease snapshot, rejects reparse points and non-regular
deployment files, invokes the fixed AppCmd operation, and verifies the result.
It never copies, cleans, builds, changes bindings, changes an app pool, or
accepts a caller-supplied path, IIS identity, executable, or command arguments.
Incomplete pipe requests expire after ten seconds. A switch is refused unless
its pre-mutation audit event can be stored, and the fixed audit log rotates at
one MiB instead of growing without limit.

## Build and install

From a normal repository shell, publish the self-contained executable:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/iis-slot-broker/publish-broker.ps1
```

Then open an elevated PowerShell and install it. The installer discovers the
current Steam Engine root virtual directory and current user SID, then pins
the exact repository blue/green paths. It refuses pre-existing installation
directories, creates directories without inherited ACLs, grants the caller
read/execute access only to the installed binaries, keeps ProgramData limited
to Administrators/System, rejects reparse points or unexpected owners/rules, and verifies both
installed executable hashes before registering the service. It does not start
the service:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/iis-slot-broker/install-broker.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File tools/iis-slot-broker/start-broker.ps1
```

The service initially runs as LocalSystem. A virtual service account could be
considered later, but only after confirming that its IIS configuration ACLs can
read and update the pinned root virtual directory. The current design does not
weaken IIS configuration ACLs merely to avoid LocalSystem.

To remove the service and only its fixed installed files, run the removal
script elevated:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/iis-slot-broker/remove-broker.ps1
```

Do not run the real install, start, remove, or live broker exercise without an
explicit approval for that machine-level step.
