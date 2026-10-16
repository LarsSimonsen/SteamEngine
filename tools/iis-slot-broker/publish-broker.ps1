$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$projectPath = Join-Path $PSScriptRoot "SteamEngineIisSlotBroker.csproj"
$clientProjectPath = Join-Path $PSScriptRoot "..\iis-slot-broker-client\SteamEngineIisSlotBrokerClient.csproj"
$publishDirectory = Join-Path $repositoryRoot ".build-runs\iis-slot-broker-publish"

New-Item -ItemType Directory -Force -Path $publishDirectory | Out-Null
dotnet publish $projectPath `
    --configuration Release `
    --runtime win-x64 `
    --self-contained true `
    --output $publishDirectory `
    -p:PublishSingleFile=true `
    -p:IncludeNativeLibrariesForSelfExtract=true `
    -p:PublishTrimmed=false

dotnet publish $clientProjectPath `
    --configuration Release `
    --runtime win-x64 `
    --self-contained true `
    --output $publishDirectory `
    -p:PublishSingleFile=true `
    -p:IncludeNativeLibrariesForSelfExtract=true `
    -p:PublishTrimmed=false

$executablePath = Join-Path $publishDirectory "SteamEngineIisSlotBroker.exe"
if (-not (Test-Path -LiteralPath $executablePath -PathType Leaf)) {
    throw "The broker publish did not produce $executablePath."
}
$clientExecutablePath = Join-Path $publishDirectory "SteamEngineIisSlotBrokerClient.exe"
if (-not (Test-Path -LiteralPath $clientExecutablePath -PathType Leaf)) {
    throw "The broker publish did not produce $clientExecutablePath."
}

Write-Host "Published the broker to $publishDirectory."
