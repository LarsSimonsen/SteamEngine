# IIS slot broker contract

Read this only for broker installation, startup, security changes, or diagnosis.

- The installed `SteamEngineIisSlotBroker` service is the sole elevated IIS boundary.
  Ordinary builds use its unprivileged native client; never invoke AppCmd, PowerShell,
  or a build as administrator.
- The client verifies that the named-pipe server PID belongs to the registered running
  service. The broker may inspect only the pinned root virtual directory and switch its
  `physicalPath` between the exact blue and green slots.
- The protocol accepts only `inspect` and lease-based `switch`; reject caller-supplied
  paths, site names, executables, commands, or arguments.
- The installer must refuse existing install/data directories, restrict ProgramData to
  Administrators/System, grant the caller read/execute on installed binaries only, and
  verify ACLs, ownership, reparse status, and executable hashes before service
  registration.
- Installation and startup are machine-level changes requiring explicit approval. The
  installer pins the root virtual-directory identity, authorized user SID, and slots
  outside the repository.
- Sandbox identity can hide the client. When a build requests host identity, rerun the
  same build unsandboxed as the pinned ordinary user. Confirm absence or stopped state
  with host-side `sc.exe query SteamEngineIisSlotBroker`.
- The service currently runs as LocalSystem. Do not loosen IIS ACLs; consider a virtual
  service account only after verifying access to the pinned IIS configuration.
