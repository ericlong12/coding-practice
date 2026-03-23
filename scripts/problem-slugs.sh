#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-.}"

find "$ROOT_DIR" \
  -type f \
  -name "*.ts" \
  ! -path "*/node_modules/*" \
  ! -path "*/dist/*" \
  ! -path "*/build/*" \
  ! -path "*/coverage/*" \
  ! -path "*/scripts/*" \
  -print \
  | sed "s#^\./##" \
  | sort \
  | while read -r file; do
      basename "$file" .ts
    done
