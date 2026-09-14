#!/usr/bin/env bash
# Ship the committed state of this repo to production.
#
# vladimirdeev.com is a Cloudflare Worker built from the private
# `portfolio-site` repo on every push to its main. This script mirrors the
# current HEAD there, keeping the files that intentionally differ, pushes,
# and waits for the live homepage to change.
#
#   npm run deploy            test, sync, push, wait for the live site
#   npm run deploy -- --skip-tests
set -euo pipefail

DEPLOY_REMOTE="git@github.com:vladimir-deev-kazanov/portfolio-site.git"
LIVE_URL="https://vladimirdeev.com/"

# Never copied to the deploy repo. The last two have Cloudflare-specific
# versions there (no .openai import; pnpm `packages` field + allowBuilds false).
KEEP_OUT=(
  CLAUDE.md
  .openai/
  app/home-alt/page.tsx
  scripts/deploy.sh
  vite.config.ts
  pnpm-workspace.yaml
)

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"
export PATH="$HOME/.local/node/bin:$PATH"

if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "✗ Uncommitted changes. Commit first — only HEAD is deployed." >&2
  exit 1
fi

if [[ "${1:-}" != "--skip-tests" ]]; then
  npm test
fi

git push -q origin HEAD:main

SHA="$(git rev-parse --short HEAD)"
WORK="$(mktemp -d -t portfolio-deploy)"
trap 'rm -rf "$WORK"' EXIT

git clone -q --depth 1 "$DEPLOY_REMOTE" "$WORK/site"
mkdir "$WORK/src"
git archive HEAD | tar -x -C "$WORK/src"

EXCLUDES=(--exclude .git)
for path in "${KEEP_OUT[@]}"; do EXCLUDES+=(--exclude "/$path"); done
rsync -a --delete "${EXCLUDES[@]}" "$WORK/src/" "$WORK/site/"

cd "$WORK/site"
git add -A
if git diff --cached --quiet; then
  echo "✓ portfolio-site already matches $SHA — nothing to deploy."
  exit 0
fi
git diff --cached --stat
git commit -q -m "$(git -C "$ROOT" log -1 --format=%B)" -m "Source: portfolio@$SHA"
BEFORE="$(curl -fsS "$LIVE_URL" | shasum)"
git push -q origin HEAD:main
echo "→ Pushed to portfolio-site. Waiting for Cloudflare build…"

for _ in $(seq 36); do
  sleep 5
  if [[ "$(curl -fsS "$LIVE_URL" | shasum)" != "$BEFORE" ]]; then
    echo "✓ Live: $LIVE_URL now serves portfolio@$SHA"
    exit 0
  fi
done
echo "… Homepage HTML didn't change within 3 minutes. Asset-only changes (e.g. an" \
     "image) don't alter it — check the Cloudflare dashboard if unsure."
