#!/usr/bin/env bash
# Push the current branch to GitHub using GITHUB_TOKEN from .env.local.
# Used by the news-publish skill; falls back to an unauthenticated push if no token is present.
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$repo_root"

branch="$(git rev-parse --abbrev-ref HEAD)"

if [ -f .env.local ]; then
  # shellcheck disable=SC1091
  set -a; . ./.env.local; set +a
fi

remote_url="$(git remote get-url origin)"

if [ -n "${GITHUB_TOKEN:-}" ] && [[ "$remote_url" == https://github.com/* ]]; then
  # Extract owner/repo from the https URL
  repo_path="${remote_url#https://github.com/}"
  repo_path="${repo_path%.git}"
  auth_url="https://x-access-token:${GITHUB_TOKEN}@github.com/${repo_path}.git"
  git push "$auth_url" "$branch"
else
  echo "GITHUB_TOKEN not set (or non-GitHub remote); attempting unauthenticated push" >&2
  git push origin "$branch"
fi
