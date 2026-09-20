param(
    [Parameter(Mandatory = $true)]
    [string]$Machine
)

$repo = 'C:\Convera Strategies\convera_website_codes\convera_published_codes'
$machine = $Machine.Trim().ToLowerInvariant()
if ($machine -notin @('windows', 'mac')) {
    throw "Machine must be 'windows' or 'mac'."
}

$current = git -C $repo branch --show-current
if (-not $current) {
    Write-Host 'No branch is currently checked out.'
    exit 1
}

if ($current -notlike "$machine/*") {
    Write-Host "Current branch '$current' does not match the machine prefix '$machine/'. Run the machine branch workflow first."
    exit 1
}

$dirty = git -C $repo status --porcelain
if ($dirty) {
    Write-Host 'Working tree is not clean. Sync skipped to avoid conflicts.'
    exit 0
}

git -C $repo fetch --all --prune
$pullResult = git -C $repo pull --rebase origin $current 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Pull/rebase failed. Resolve branch divergence before pushing.'
    Write-Host $pullResult
    exit 1
}

$pushResult = git -C $repo push origin HEAD 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Push failed. This usually means another machine is ahead or the branch changed remotely.'
    Write-Host $pushResult
    exit 1
}

Write-Host "Synced machine branch '$current' successfully."
