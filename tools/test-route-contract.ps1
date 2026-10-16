[CmdletBinding()]
param(
    [string] $IisBaseUrl
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$contractPath = Join-Path $PSScriptRoot "route-contract.json"
$localConfigPath = Join-Path $PSScriptRoot "local-iis-web.config"
$configuredPublicRoot = [Environment]::GetEnvironmentVariable("STEAM_ENGINE_PUBLIC_ROOT")
$publicRoot = if ($configuredPublicRoot) {
    [System.IO.Path]::GetFullPath($configuredPublicRoot)
} else {
    Join-Path $projectRoot "public"
}
$generatedConfigPath = Join-Path $publicRoot "web.config"

if (-not (Test-Path -LiteralPath $contractPath)) {
    throw "Route contract not found: $contractPath"
}

$contract = Get-Content -LiteralPath $contractPath -Raw | ConvertFrom-Json
if ($contract.version -ne 2) {
    throw "Unsupported route contract version: $($contract.version)"
}

$localizedLocales = @($contract.localization.publishedLocales | Where-Object {
    $_ -ne $contract.localization.defaultLocale
})
$localizedLocalePattern = $localizedLocales -join "|"
$calculatorPattern = @($contract.navigation.routableCalculators | ForEach-Object {
    ([string] $_).TrimStart("/")
}) -join "|"
$categoryPattern = @($contract.catalogDetail.categories) -join "|"

function Get-CategoryShortcut([string] $category) {
    $shortcut = @($contract.catalogDetail.categoryShortcuts | Where-Object {
        $_.path -eq "/catalog/$category"
    })
    if ($shortcut.Count -ne 1) {
        throw "Expected exactly one catalog shortcut for '$category'."
    }

    return $shortcut[0]
}

$conceptShortcut = Get-CategoryShortcut "concept"
$batteryShortcut = Get-CategoryShortcut "battery"
$modShortcut = Get-CategoryShortcut "mod"
$materialShortcut = Get-CategoryShortcut "material"

function New-IisRuleExpectation(
    [string] $name,
    [string] $match,
    [string] $action,
    [string] $target,
    [int] $statusCode = 0
) {
    return [pscustomobject] @{
        name = $name
        match = $match
        action = $action
        target = $target
        statusCode = $statusCode
    }
}

$expectedIisRules = @(
    New-IisRuleExpectation "SteamEngineRootImplementationSuffixRedirect" `
        "^(?:default\.asp|index\.html)$" "Redirect" "/"
    New-IisRuleExpectation "SteamEngineWireWizAspRedirect" `
        "^wirewiz\.asp$" "Redirect" "wirewiz"
    New-IisRuleExpectation "SteamEngineImplementationSuffixRedirect" `
        "^((?:$calculatorPattern))\.(?:asp|html)$" "Redirect" "{R:1}"
    New-IisRuleExpectation "SteamEngineUnsupportedImplementationSuffix" `
        "^(.+)\.(?:asp|html)$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineLocalizedRootPageTrailingSlashUnsupported" `
        "^($localizedLocalePattern)/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineLocalizedRootPage" `
        "^($localizedLocalePattern)$" "Rewrite" "{R:1}.html"
    New-IisRuleExpectation "SteamEngineLocalizedCalculatorPageTrailingSlashUnsupported" `
        "^($localizedLocalePattern)/($calculatorPattern)/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineLocalizedComparisonTrailingSlashUnsupported" `
        "^($localizedLocalePattern)/compare/(batteries|materials|mods)/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineLocalizedCatalogDetailTrailingSlashUnsupported" `
        "^((?:$localizedLocalePattern)/catalog/(?:$categoryPattern)/[^/.]+)/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineLocalizedCatalogShortcutTrailingSlashUnsupported" `
        "^(?:$localizedLocalePattern)/catalog/(?:$categoryPattern)/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineLocalizedCatalogPageTrailingSlashUnsupported" `
        "^(?:$localizedLocalePattern)/catalog/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineLocalizedCatalogConceptShortcut" `
        "^($localizedLocalePattern)/catalog/concept$" "Redirect" "{R:1}$($conceptShortcut.location)"
    New-IisRuleExpectation "SteamEngineLocalizedCatalogBatteryShortcut" `
        "^($localizedLocalePattern)/catalog/battery$" "Redirect" "{R:1}$($batteryShortcut.location)"
    New-IisRuleExpectation "SteamEngineLocalizedCatalogModShortcut" `
        "^($localizedLocalePattern)/catalog/mod$" "Redirect" "{R:1}$($modShortcut.location)"
    New-IisRuleExpectation "SteamEngineLocalizedCatalogMaterialShortcut" `
        "^($localizedLocalePattern)/catalog/material$" "Redirect" "{R:1}$($materialShortcut.location)"
    New-IisRuleExpectation "SteamEngineLocalizedCatalogPage" `
        "^($localizedLocalePattern)/catalog$" "Rewrite" "{R:1}/catalog.html"
    New-IisRuleExpectation "SteamEngineLocalizedSlugPage" `
        "^((?:$localizedLocalePattern)/catalog/(?:$categoryPattern))/([^/.]+)$" `
        "Rewrite" "{R:1}/{R:2}.html"
    New-IisRuleExpectation "SteamEngineLocalizedCalculatorPage" `
        "^($localizedLocalePattern)/($calculatorPattern)$" "Rewrite" "{R:1}/{R:2}.html"
    New-IisRuleExpectation "SteamEngineLocalizedComparison" `
        "^($localizedLocalePattern)/compare/(batteries|materials|mods)$" "Rewrite" "{R:1}/compare/{R:2}.html"
    New-IisRuleExpectation "SteamEngineRootPageTrailingSlashUnsupported" `
        "^(about|privacy|$calculatorPattern)/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineComparisonTrailingSlashUnsupported" `
        "^compare/(batteries|materials|mods)/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineBlogTrailingSlashUnsupported" `
        "^blog(?:/.*)?/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineBlogRoot" "^blog$" "Rewrite" "blog/index.html"
    New-IisRuleExpectation "SteamEngineLegacyTrailingSlashUnsupported" `
        "^old(?:/[^/.]+)?/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineCatalogDetailTrailingSlashUnsupported" `
        "^catalog/(?:$categoryPattern)/[^/.]+/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineCatalogShortcutTrailingSlashUnsupported" `
        "^catalog/(?:$categoryPattern)/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineCatalogPageTrailingSlashUnsupported" `
        "^catalog/$" "CustomResponse" "" 404
    New-IisRuleExpectation "SteamEngineCatalogConceptShortcut" `
        "^catalog/concept$" "Redirect" ([string] $conceptShortcut.location).TrimStart("/")
    New-IisRuleExpectation "SteamEngineCatalogBatteryShortcut" `
        "^catalog/battery$" "Redirect" ([string] $batteryShortcut.location).TrimStart("/")
    New-IisRuleExpectation "SteamEngineCatalogModShortcut" `
        "^catalog/mod$" "Redirect" ([string] $modShortcut.location).TrimStart("/")
    New-IisRuleExpectation "SteamEngineCatalogMaterialShortcut" `
        "^catalog/material$" "Redirect" ([string] $materialShortcut.location).TrimStart("/")
    New-IisRuleExpectation "SteamEngineCatalogPage" "^catalog$" "Rewrite" "catalog.html"
    New-IisRuleExpectation "SteamEngineBlogPaginationPage" `
        "^blog/page/([1-9][0-9]*)$" "Rewrite" "blog/page/{R:1}/index.html"
    New-IisRuleExpectation "SteamEngineBlogArticlePage" `
        "^blog/([0-9]{4}/[0-9]{2}/[0-9]{2}/[a-z0-9]+(?:-[a-z0-9]+)*)$" `
        "Rewrite" "blog/{R:1}/index.html"
    New-IisRuleExpectation "SteamEngineLegacyIndex" "^old$" "Rewrite" "old/index.html"
    New-IisRuleExpectation "SteamEngineLegacyPage" "^old/([^/.]+)$" "Rewrite" "old/{R:1}.html"
    New-IisRuleExpectation "SteamEngineSlugPage" `
        "^(catalog/(?:$categoryPattern))/([^/.]+)$" "Rewrite" "{R:1}/{R:2}.html"
    New-IisRuleExpectation "SteamEngineCalculatorPage" `
        "^(about|privacy|$calculatorPattern)$" "Rewrite" "{R:1}.html"
    New-IisRuleExpectation "SteamEngineComparison" `
        "^compare/(batteries|materials|mods)$" "Rewrite" "compare/{R:1}.html"
)

function Read-IisRules([string] $path) {
    if (-not (Test-Path -LiteralPath $path)) {
        throw "IIS configuration not found: $path"
    }

    $configuration = [xml](Get-Content -LiteralPath $path -Raw)
    if ($null -eq $configuration.configuration.'system.webServer'.rewrite.rules) {
        throw "IIS configuration has no rewrite rules: $path"
    }

    return @($configuration.configuration.'system.webServer'.rewrite.rules.rule)
}

function Assert-IisRules([string] $path) {
    $actualRules = @(Read-IisRules $path)

    $actualNames = @($actualRules | ForEach-Object { $_.name })
    $expectedNames = @($expectedIisRules | ForEach-Object { $_.name })
    if (($actualNames -join "`n") -ne ($expectedNames -join "`n")) {
        throw "IIS rule order or membership differs from the IIS expectations: $path"
    }

    for ($index = 0; $index -lt $expectedIisRules.Count; $index++) {
        $expected = $expectedIisRules[$index]
        $actual = $actualRules[$index]
        if ($actual.match.url -ne $expected.match) {
            throw "Rule '$($expected.name)' has match '$($actual.match.url)', expected '$($expected.match)'."
        }
        if ($actual.action.type -ne $expected.action) {
            throw "Rule '$($expected.name)' has action '$($actual.action.type)', expected '$($expected.action)'."
        }
        $actualTarget = if ($null -eq $actual.action.url) { "" } else { [string] $actual.action.url }
        if ($actualTarget -ne $expected.target) {
            throw "Rule '$($expected.name)' targets '$actualTarget', expected '$($expected.target)'."
        }
        if ($expected.statusCode -gt 0 -and [int] $actual.action.statusCode -ne $expected.statusCode) {
            throw "Rule '$($expected.name)' has status code '$($actual.action.statusCode)', " `
                + "expected '$($expected.statusCode)'."
        }
    }
}

function Resolve-IisRule([string] $path, [string] $publicPath) {
    $relativePath = $publicPath.TrimStart("/")
    foreach ($rule in @(Read-IisRules $path)) {
        $match = [regex]::Match($relativePath, [string] $rule.match.url)
        if (-not $match.Success) {
            continue
        }

        $target = [string] $rule.action.url
        for ($index = 1; $index -lt $match.Groups.Count; $index++) {
            $target = $target.Replace("{R:$index}", $match.Groups[$index].Value)
        }

        return [pscustomobject] @{
            action = [string] $rule.action.type
            target = $target
            redirectType = [string] $rule.action.redirectType
            statusCode = [int] $rule.action.statusCode
        }
    }

    return $null
}

function Assert-PublicFile([string] $relativePath) {
    $path = Join-Path $publicRoot $relativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        throw "Expected generated public file not found: $relativePath"
    }
}

function Assert-NoPublicRouteArtifact([string] $publicPath) {
    if ($publicPath.EndsWith("/") -or $publicPath -match "\.(?:asp|html)$") {
        return
    }

    $relativePath = $publicPath.TrimStart("/")
    $artifactPaths = @($relativePath, "$relativePath.html")
    foreach ($artifactPath in $artifactPaths) {
        $path = Join-Path $publicRoot $artifactPath
        if (Test-Path -LiteralPath $path) {
            throw "Unsupported path '$publicPath' unexpectedly has a public artifact: $artifactPath"
        }
    }
}

function Assert-IisRouteCase([string] $path, $routeCase) {
    $publicPath = [string] $routeCase.publicPath
    $outcome = $routeCase.outcome
    $resolution = Resolve-IisRule $path $publicPath

    switch ([string] $outcome.kind) {
        "origin" {
            Assert-PublicFile ([string] $outcome.path)
            if ($null -eq $resolution -or $resolution.action -ne "Rewrite" -or $resolution.target -ne $outcome.path) {
                throw "IIS does not rewrite '$publicPath' to '$($outcome.path)' in $path"
            }
        }
        "canonicalRedirect" {
            $target = if ([string] $outcome.location -eq "/") { "/" } else {
                ([string] $outcome.location).TrimStart("/")
            }
            if ($null -eq $resolution -or $resolution.action -ne "Redirect" -or $resolution.target -ne $target) {
                throw "IIS does not redirect '$publicPath' to '$($outcome.location)' in $path"
            }
            if ([int] $outcome.status -eq 301 -and $resolution.redirectType -ne "Permanent") {
                throw "IIS does not use a permanent redirect for '$publicPath' in $path"
            }
        }
        "unsupported" {
            Assert-NoPublicRouteArtifact $publicPath
            if ($null -ne $resolution -and (
                    $resolution.action -ne "CustomResponse" -or
                    $resolution.statusCode -ne [int] $outcome.status
                )) {
                throw "Unsupported path '$publicPath' unexpectedly matches an IIS rule in $path"
            }
        }
        default {
            throw "Unsupported route-contract outcome '$($outcome.kind)' for '$publicPath'"
        }
    }
}

Add-Type -AssemblyName System.Net.Http
$httpHandler = [System.Net.Http.HttpClientHandler]::new()
$httpHandler.AllowAutoRedirect = $false
$httpClient = [System.Net.Http.HttpClient]::new($httpHandler)

function Get-HttpResponse([string] $url) {
    $response = $httpClient.GetAsync($url).GetAwaiter().GetResult()
    try {
        return [pscustomobject] @{
            statusCode = [int] $response.StatusCode
            location = if ($null -eq $response.Headers.Location) {
                ""
            } else {
                [string] $response.Headers.Location
            }
        }
    }
    finally {
        $response.Dispose()
    }
}

function ConvertToContractLocation([string] $baseUrl, [string] $requestUrl, [string] $location) {
    if (-not $location) {
        return ""
    }

    $baseUri = [uri] ($baseUrl.TrimEnd("/") + "/")
    $requestUri = [uri] $requestUrl
    $locationUri = [uri]::new($requestUri, $location)
    if ($locationUri.Host -ne $baseUri.Host -or $locationUri.Port -ne $baseUri.Port) {
        return $locationUri.AbsoluteUri
    }

    $basePath = $baseUri.AbsolutePath.TrimEnd("/")
    $locationPath = $locationUri.AbsolutePath
    $contractLocation = $locationPath + $locationUri.Fragment
    if ($basePath -and $locationPath.StartsWith("$basePath/")) {
        return $locationPath.Substring($basePath.Length) + $locationUri.Fragment
    }

    return $contractLocation
}

function Assert-IisHttpRouteCase([string] $baseUrl, $routeCase) {
    $url = $baseUrl.TrimEnd("/") + $routeCase.publicPath
    $response = Get-HttpResponse $url

    switch ([string] $routeCase.outcome.kind) {
        "origin" {
            if ($response.statusCode -ne 200) {
                throw "Expected HTTP 200 from $url, received $($response.statusCode)."
            }
        }
        "canonicalRedirect" {
            $expectedStatus = [int] $routeCase.outcome.status
            $expectedLocation = [string] $routeCase.outcome.location
            $actualLocation = ConvertToContractLocation $baseUrl $url $response.location
            if ($response.statusCode -ne $expectedStatus -or $actualLocation -ne $expectedLocation) {
                throw "Expected $url to redirect to $expectedLocation with HTTP $expectedStatus."
            }
        }
        "unsupported" {
            $expectedStatus = [int] $routeCase.outcome.status
            if ($response.statusCode -ne $expectedStatus -or $response.location) {
                throw "Expected unsupported path $url to return HTTP $expectedStatus without a redirect."
            }
        }
    }
}

function Assert-UniqueValues([string] $label, [object[]] $values) {
    $duplicates = @($values | Group-Object | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Name })
    if ($duplicates.Count -gt 0) {
        throw "$label contains duplicate values: $($duplicates -join ', ')"
    }
}

function Assert-ContractStructure {
    $specificationPath = Join-Path $projectRoot ([string] $contract.specification)
    if (-not (Test-Path -LiteralPath $specificationPath -PathType Leaf)) {
        throw "Route-contract specification not found: $specificationPath"
    }
    if ($contract.origin.productionIncludesLocalIisConfig -ne $false) {
        throw "The provider-neutral contract must exclude local IIS web.config from production."
    }
    if (@($contract.canonicalization.slashful).Count -ne 0) {
        throw "The route contract must not define slashful canonical routes."
    }

    Assert-UniqueValues "Published locales" @($contract.localization.publishedLocales)
    Assert-UniqueValues "Localized page paths" @($contract.localization.localizedPagePaths)
    Assert-UniqueValues "Routable calculators" @($contract.navigation.routableCalculators)
    Assert-UniqueValues "Comparison pages" @($contract.navigation.comparisonPages)
    Assert-UniqueValues "Primary calculator navigation" @($contract.navigation.primaryCalculators)
    Assert-UniqueValues "Home tools" @($contract.navigation.homeTools)
    Assert-UniqueValues "Listed legacy pages" @($contract.legacy.listedPages)
    Assert-UniqueValues "Addressable-only legacy pages" @($contract.legacy.addressableOnlyPages)

    if (@($contract.localization.publishedLocales) -notcontains $contract.localization.defaultLocale) {
        throw "The default locale must be included in publishedLocales."
    }

    $expectedLocalizedPages = @("/", "/catalog") + @($contract.navigation.routableCalculators) `
        + @($contract.navigation.comparisonPages)
    $localizedPageDifference = Compare-Object `
        -ReferenceObject @($expectedLocalizedPages | Sort-Object) `
        -DifferenceObject @(@($contract.localization.localizedPagePaths) | Sort-Object)
    if ($localizedPageDifference) {
        throw "Localized page parity must include the home page, catalog, calculators, and comparison pages."
    }

    $unknownPrimaryRoutes = @($contract.navigation.primaryCalculators | Where-Object {
        @($contract.navigation.routableCalculators) -notcontains $_
    })
    if ($unknownPrimaryRoutes.Count -gt 0) {
        throw "Primary navigation contains non-calculator routes: $($unknownPrimaryRoutes -join ', ')"
    }

    $legacyOverlap = Compare-Object `
        -ReferenceObject @($contract.legacy.listedPages) `
        -DifferenceObject @($contract.legacy.addressableOnlyPages) `
        -IncludeEqual -ExcludeDifferent
    if ($legacyOverlap) {
        throw "Legacy pages cannot be both listed and addressable-only."
    }

    $shortcutCategories = @($contract.catalogDetail.categoryShortcuts | ForEach-Object {
        ([string] $_.path).Substring(([string] $_.path).LastIndexOf("/") + 1)
    })
    $categoryDifference = Compare-Object `
        -ReferenceObject @(@($contract.catalogDetail.categories) | Sort-Object) `
        -DifferenceObject @($shortcutCategories | Sort-Object)
    if ($categoryDifference) {
        throw "Every catalog category must have exactly one category shortcut."
    }
    foreach ($shortcut in @($contract.catalogDetail.categoryShortcuts)) {
        if ([int] $shortcut.status -ne 301 -or -not ([string] $shortcut.location).StartsWith("/catalog#")) {
            throw "Catalog shortcuts must be permanent redirects to a /catalog fragment."
        }
    }
}

function Assert-OriginMatrix {
    Assert-PublicFile "catalog.html"
    Assert-PublicFile "blog/index.html"
    Assert-PublicFile "old/index.html"
    foreach ($route in @("/about", "/privacy") + @($contract.navigation.routableCalculators)) {
        Assert-PublicFile "$($route.TrimStart('/')).html"
    }

    foreach ($legacyRoute in @($contract.legacy.listedPages) + @($contract.legacy.addressableOnlyPages)) {
        Assert-PublicFile "$($legacyRoute.TrimStart('/')).html"
    }

    foreach ($locale in $localizedLocales) {
        Assert-PublicFile "$locale.html"
        Assert-PublicFile "$locale/catalog.html"
        foreach ($route in @($contract.navigation.routableCalculators)) {
            Assert-PublicFile "$locale/$($route.TrimStart('/')).html"
        }
    }

    foreach ($category in @($contract.catalogDetail.categories)) {
        $englishCategoryRoot = Join-Path $publicRoot "catalog/$category"
        if (-not (Test-Path -LiteralPath $englishCategoryRoot -PathType Container)) {
            throw "Expected generated catalog category not found: catalog/$category"
        }
        foreach ($entry in @(Get-ChildItem -LiteralPath $englishCategoryRoot -File -Filter "*.html")) {
            foreach ($locale in $localizedLocales) {
                Assert-PublicFile "$locale/catalog/$category/$($entry.Name)"
            }
        }
    }
}

foreach ($implementationPath in @(
        "/catalog.html",
        "/catalog/battery/ampace-jp30p1-3000mah.html",
        "/old/ohm.asp",
        "/nb/converter.html"
    )) {
    foreach ($iisConfigPath in @($localConfigPath, $generatedConfigPath)) {
        $resolution = Resolve-IisRule $iisConfigPath $implementationPath
        if ($null -eq $resolution -or $resolution.action -ne "CustomResponse" -or $resolution.statusCode -ne 404) {
            throw "Non-calculator implementation path '$implementationPath' is not rejected in $iisConfigPath"
        }
    }
}

Assert-ContractStructure
Assert-IisRules $localConfigPath
Assert-IisRules $generatedConfigPath
Assert-OriginMatrix

foreach ($routeCase in @($contract.routeCases)) {
    Assert-IisRouteCase $localConfigPath $routeCase
    Assert-IisRouteCase $generatedConfigPath $routeCase
}

if ($IisBaseUrl) {
    foreach ($routeCase in @($contract.routeCases)) {
        Assert-IisHttpRouteCase $IisBaseUrl $routeCase
    }
    $httpClient.Dispose()
    $httpHandler.Dispose()
}

Write-Output "Route contract validation passed."
$routeCaseCount = @($contract.routeCases).Count
Write-Output "Checked $($expectedIisRules.Count) IIS rules and $routeCaseCount route cases."
if ($IisBaseUrl) {
    Write-Output "Verified route cases through local IIS at $IisBaseUrl."
}
