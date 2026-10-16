# Run this script elevated. It removes only the fixed broker service and installation directories.
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]::new($identity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    throw "Remove-broker.ps1 must run elevated."
}

$service = Get-Service -Name "SteamEngineIisSlotBroker" -ErrorAction SilentlyContinue
if ($service) {
    if ($service.Status -ne "Stopped") { Stop-Service -Name "SteamEngineIisSlotBroker" -Force }
    & sc.exe delete SteamEngineIisSlotBroker
    if ($LASTEXITCODE -ne 0) { throw "sc.exe could not remove SteamEngineIisSlotBroker." }
}

$installDirectory = Join-Path $env:ProgramFiles "SteamEngineIisSlotBroker"
$dataDirectory = Join-Path $env:ProgramData "SteamEngineIisSlotBroker"
foreach ($directory in @($installDirectory, $dataDirectory)) {
    if (Test-Path -LiteralPath $directory) { Remove-Item -LiteralPath $directory -Recurse -Force }
}

Write-Host "Removed SteamEngineIisSlotBroker and its installed files."
