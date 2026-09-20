param(
    [Parameter(Mandatory = $true)]
    [string]$Machine,

    [Parameter(Mandatory = $true)]
    [string]$Name
)

$repo = 'C:\Convera Strategies\convera_website_codes\convera_published_codes'
$machine = $Machine.Trim().ToLowerInvariant()
if ($machine -notin @('windows', 'mac')) {
    throw "Machine must be 'windows' or 'mac'."
}

$branchName = "$machine/$Name"

if ($branchName -match '\s+') {
    throw 'Branch names cannot contain spaces.'
}

# Fail safely if the repo is not clean.
if ((git -C $repo status --porcelain).Length -gt 0) {
    Write-Host 'Working tree is not clean. Commit or stash before creating a machine branch.'
    exit 1
}

git -C $repo fetch --all --prune

git -C $repo switch main_conversa
$pullResult = git -C $repo pull --rebase origin main_conversa 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Unable to update main_conversa from remote.'
    Write-Host $pullResult
    exit 1
}

git -C $repo switch -c $branchName
Write-Host "Branch created and checked out: $branchName"
Write-Host 'From this point, push only this branch and do not work directly on main_conversa.'
