#!/usr/bin/env bash
# Build the site and push to the gh-pages branch for GitHub Pages.
# After running, enable Pages: Settings → Pages → Deploy from branch → gh-pages → / (root)
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO="${1:-https://github.com/ajanardh/cafefausseaj.git}"
REPO_NAME="${2:-cafefausseaj}"
API_URL="${VITE_API_URL:-}"

if [ -z "$API_URL" ]; then
  echo "WARNING: VITE_API_URL is not set. Reservations will NOT work on the live site."
  echo "Set it to your Render backend, e.g.:"
  echo "  VITE_API_URL=https://cafe-fausse-api.onrender.com/api ./scripts/deploy-github-pages.sh"
  echo ""
fi

echo "Building frontend for GitHub Pages (/ ${REPO_NAME} /) ..."
cd "$ROOT_DIR/frontend"
VITE_BASE_PATH="/${REPO_NAME}/" VITE_API_URL="$API_URL" npm run build

DEPLOY_DIR=$(mktemp -d)
cp -R dist/. "$DEPLOY_DIR/"
cd "$DEPLOY_DIR"

git init -b gh-pages
git add .
git commit -m "Deploy site to GitHub Pages"

echo "Pushing to gh-pages branch ..."
git push -f "$REPO" gh-pages

rm -rf "$DEPLOY_DIR"

echo ""
echo "Done! Now enable GitHub Pages:"
echo "  1. Open https://github.com/${REPO_NAME%%/*}/$(basename "$REPO" .git)/settings/pages"
echo "  2. Source: Deploy from a branch"
echo "  3. Branch: gh-pages  Folder: / (root)"
echo "  4. Save"
echo ""
echo "Your site: https://ajanardh.github.io/${REPO_NAME}/"
