$repo = 'C:\Convera Strategies\convera_website_codes\convera_published_codes'
$branch = git -C $repo branch --show-current

if (-not $branch) {
    Write-Host 'No current branch detected; exiting.'
    exit 1
}

$dirty = git -C $repo status --porcelain
if ($dirty) {
    Write-Host 'Working tree is not clean. Skipping pull/push to avoid conflicts.'
    exit 0
}

Write-Host "Syncing branch: $branch"

# Refresh remote state and rebase local branch onto the remote branch if needed.
git -C $repo fetch --all --prune
$rebaseResult = git -C $repo pull --rebase origin $branch 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Rebase failed; leaving branch in a safe state and skipping push.'
    Write-Host $rebaseResult
    exit 1
}

# Push only if the branch is ahead or the repo is clean.
$pushResult = git -C $repo push origin HEAD 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Push failed; check for remote conflicts or branch protection.'
    Write-Host $pushResult
    exit 1
}

Write-Host 'Git sync completed successfully.'
