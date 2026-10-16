# Run this script from an elevated PowerShell after publish-broker.ps1 completed in a normal shell.
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Assert-Administrator {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = [Security.Principal.WindowsPrincipal]::new($identity)
    if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
        throw "Install-broker.ps1 must run elevated."
    }
}

function New-SecureBrokerDirectory {
    param(
        [Parameter(Mandatory)][string]$Path,
        [string]$ReadExecuteSid
    )

    if (Test-Path -LiteralPath $Path) {
        throw "Refusing to use pre-existing broker directory: $Path. Remove and review it first."
    }

    $systemSid = [Security.Principal.SecurityIdentifier]::new("S-1-5-18")
    $administratorsSid = [Security.Principal.SecurityIdentifier]::new("S-1-5-32-544")
    $security = [Security.AccessControl.DirectorySecurity]::new()
    $security.SetAccessRuleProtection($true, $false)
    $security.SetOwner($administratorsSid)
    foreach ($sid in @($systemSid, $administratorsSid)) {
        $rule = [Security.AccessControl.FileSystemAccessRule]::new(
            $sid,
            [Security.AccessControl.FileSystemRights]::FullControl,
            [Security.AccessControl.InheritanceFlags]::ContainerInherit -bor
                [Security.AccessControl.InheritanceFlags]::ObjectInherit,
            [Security.AccessControl.PropagationFlags]::None,
            [Security.AccessControl.AccessControlType]::Allow)
        $security.AddAccessRule($rule)
    }
    if ($ReadExecuteSid) {
        $callerSid = [Security.Principal.SecurityIdentifier]::new($ReadExecuteSid)
        $callerRule = [Security.AccessControl.FileSystemAccessRule]::new(
            $callerSid,
            [Security.AccessControl.FileSystemRights]::ReadAndExecute,
            [Security.AccessControl.InheritanceFlags]::ContainerInherit -bor
                [Security.AccessControl.InheritanceFlags]::ObjectInherit,
            [Security.AccessControl.PropagationFlags]::None,
            [Security.AccessControl.AccessControlType]::Allow)
        $security.AddAccessRule($callerRule)
    }

    [IO.DirectoryInfo]::new($Path).Create($security)
    Assert-SecureBrokerPath -Path $Path -RequireProtectedAcl -ReadExecuteSid $ReadExecuteSid
}

function Assert-SecureBrokerPath {
    param(
        [Parameter(Mandatory)][string]$Path,
        [switch]$RequireProtectedAcl,
        [string]$ReadExecuteSid
    )

    $item = Get-Item -LiteralPath $Path -Force
    if (($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
        throw "Broker installation path contains a reparse point: $Path"
    }

    $allowedSids = @("S-1-5-18", "S-1-5-32-544")
    if ($ReadExecuteSid) { $allowedSids += $ReadExecuteSid }
    $acl = Get-Acl -LiteralPath $Path
    if ($RequireProtectedAcl -and -not $acl.AreAccessRulesProtected) {
        throw "Broker installation path still inherits permissions: $Path"
    }
    $ownerSid = $acl.GetOwner([Security.Principal.SecurityIdentifier]).Value
    if ($ownerSid -notin $allowedSids) {
        throw "Broker installation path has an unexpected owner: $Path"
    }

    $rules = $acl.GetAccessRules($true, $true, [Security.Principal.SecurityIdentifier])
    $seenSids = @()
    foreach ($rule in $rules) {
        $sid = ([Security.Principal.SecurityIdentifier]$rule.IdentityReference).Value
        if ($rule.AccessControlType -ne [Security.AccessControl.AccessControlType]::Allow -or
            $sid -notin $allowedSids) {
            throw "Broker installation path has an unexpected access rule for $sid`: $Path"
        }
        $seenSids += $sid
    }
    foreach ($requiredSid in $allowedSids) {
        if ($requiredSid -notin $seenSids) {
            throw "Broker installation path is missing required access for $requiredSid`: $Path"
        }
    }
}

Assert-Administrator
$repositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$publishDirectory = Join-Path $repositoryRoot ".build-runs\iis-slot-broker-publish"
$sourceExecutable = Join-Path $publishDirectory "SteamEngineIisSlotBroker.exe"
$sourceClientExecutable = Join-Path $publishDirectory "SteamEngineIisSlotBrokerClient.exe"
$programFiles = [Environment]::GetFolderPath([Environment+SpecialFolder]::ProgramFiles)
$programData = [Environment]::GetFolderPath([Environment+SpecialFolder]::CommonApplicationData)
$windowsDirectory = [Environment]::GetFolderPath([Environment+SpecialFolder]::Windows)
$installDirectory = Join-Path $programFiles "SteamEngineIisSlotBroker"
$dataDirectory = Join-Path $programData "SteamEngineIisSlotBroker"
$installedExecutable = Join-Path $installDirectory "SteamEngineIisSlotBroker.exe"
$installedClientExecutable = Join-Path $installDirectory "SteamEngineIisSlotBrokerClient.exe"
$configurationPath = Join-Path $dataDirectory "config.json"
$appCmdPath = Join-Path $windowsDirectory "System32\inetsrv\appcmd.exe"

if (-not (Test-Path -LiteralPath $sourceExecutable -PathType Leaf)) {
    throw "Publish the broker first with tools/iis-slot-broker/publish-broker.ps1."
}
if (-not (Test-Path -LiteralPath $sourceClientExecutable -PathType Leaf)) {
    throw "Publish the authenticated broker client first with tools/iis-slot-broker/publish-broker.ps1."
}
if (-not (Test-Path -LiteralPath $appCmdPath -PathType Leaf)) {
    throw "The fixed IIS AppCmd executable was not found at $appCmdPath."
}
if (Get-Service -Name "SteamEngineIisSlotBroker" -ErrorAction SilentlyContinue) {
    throw "SteamEngineIisSlotBroker is already installed. Remove it before installing a new pinned configuration."
}

$slotRoot = Join-Path $repositoryRoot ".iis-slots"
$bluePath = [IO.Path]::GetFullPath((Join-Path $slotRoot "blue"))
$greenPath = [IO.Path]::GetFullPath((Join-Path $slotRoot "green"))
$legacyPublicPath = [IO.Path]::GetFullPath((Join-Path $repositoryRoot "public"))
$siteName = $env:STEAM_ENGINE_IIS_SITE

[xml]$iisXml = (& $appCmdPath list vdir /xml | Out-String)
$rootDirectories = @($iisXml.appcmd.VDIR | Where-Object { $_.path -eq "/" })
$matchingDirectories = @($rootDirectories | Where-Object {
    $physicalPath = [IO.Path]::GetFullPath([string]$_.physicalPath)
    ($physicalPath -ieq $bluePath) -or ($physicalPath -ieq $greenPath) -or ($physicalPath -ieq $legacyPublicPath)
})
if ($siteName) {
    $expectedName = ($siteName.TrimEnd("/", "\") + "/")
    $matchingDirectories = @($matchingDirectories | Where-Object { [string]$_['VDIR.NAME'] -ieq $expectedName })
}
if ($matchingDirectories.Count -ne 1) {
    throw "Expected exactly one IIS root virtual directory on public, blue, or green; " +
        "found $($matchingDirectories.Count). Set STEAM_ENGINE_IIS_SITE if needed."
}

$callerSid = [Security.Principal.WindowsIdentity]::GetCurrent().User.Value
$virtualDirectoryName = [string]$matchingDirectories[0].'VDIR.NAME'
$configuration = [ordered]@{
    version = 1
    virtualDirectoryName = $virtualDirectoryName
    authorizedCallerSid = $callerSid
    bluePath = $bluePath
    greenPath = $greenPath
    legacyPublicPath = $legacyPublicPath
}

New-SecureBrokerDirectory -Path $installDirectory -ReadExecuteSid $callerSid
New-SecureBrokerDirectory -Path $dataDirectory
$sourceHash = (Get-FileHash -LiteralPath $sourceExecutable -Algorithm SHA256).Hash
$sourceClientHash = (Get-FileHash -LiteralPath $sourceClientExecutable -Algorithm SHA256).Hash
Copy-Item -LiteralPath $sourceExecutable -Destination $installedExecutable -Force
Copy-Item -LiteralPath $sourceClientExecutable -Destination $installedClientExecutable -Force
$configuration | ConvertTo-Json | Set-Content -LiteralPath $configurationPath -Encoding UTF8
if ((Get-FileHash -LiteralPath $installedExecutable -Algorithm SHA256).Hash -ne $sourceHash) {
    throw "The installed broker executable does not match the reviewed publish artifact."
}
if ((Get-FileHash -LiteralPath $installedClientExecutable -Algorithm SHA256).Hash -ne $sourceClientHash) {
    throw "The installed broker client does not match the reviewed publish artifact."
}
Assert-SecureBrokerPath -Path $installedExecutable -ReadExecuteSid $callerSid
Assert-SecureBrokerPath -Path $installedClientExecutable -ReadExecuteSid $callerSid
Assert-SecureBrokerPath -Path $configurationPath

$serviceBinaryPath = '"' + $installedExecutable + '"'
& sc.exe create SteamEngineIisSlotBroker binPath= $serviceBinaryPath start= auto `
    obj= LocalSystem DisplayName= "Steam Engine IIS Slot Broker"
if ($LASTEXITCODE -ne 0) { throw "sc.exe could not create SteamEngineIisSlotBroker." }
& sc.exe description SteamEngineIisSlotBroker "Pinned, local-only Steam Engine IIS blue/green slot broker."
if ($LASTEXITCODE -ne 0) { throw "sc.exe could not describe SteamEngineIisSlotBroker." }

Write-Host "Installed SteamEngineIisSlotBroker without starting it."
Write-Host "Pinned VDIR: $virtualDirectoryName"
Write-Host "Authorized caller SID: $callerSid"
Write-Host "Configuration: $configurationPath"
Write-Host "Start and inspect it with tools/iis-slot-broker/start-broker.ps1."
