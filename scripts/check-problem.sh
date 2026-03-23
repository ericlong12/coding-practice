#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "usage: ./scripts/check-problem.sh <problem-slug>"
  exit 1
fi

TARGET_SLUG="$1"

MATCHES="$(./scripts/solved-inventory.sh | while read -r file; do
  if [ "$(basename "$file" .ts)" = "$TARGET_SLUG" ]; then
    echo "$file"
  fi
done)"

if [ -n "$MATCHES" ]; then
  echo "already solved:"
  echo "$MATCHES"
  exit 0
fi

echo "not found: $TARGET_SLUG"
