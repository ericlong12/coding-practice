#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "usage: ./scripts/check-problem.sh <problem-slug>"
  exit 1
fi

normalize() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[-_ ]//g'
}

TARGET_SLUG="$(normalize "$1")"

MATCHES="$(
  ./scripts/solved-inventory.sh | while read -r file; do
    base="$(basename "$file" .ts)"
    normalized_base="$(normalize "$base")"
    if [ "$normalized_base" = "$TARGET_SLUG" ]; then
      echo "$file"
    fi
  done
)"

if [ -n "$MATCHES" ]; then
  echo "already solved:"
  echo "$MATCHES"
  exit 0
fi

echo "not found: $1"
