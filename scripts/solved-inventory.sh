#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-.}"

find "$ROOT_DIR" \
  -type f \
  -name "*.ts" \
  ! -name "*.test.ts" \
  ! -name "*.spec.ts" \
  ! -name "*.d.ts" \
  ! -path "*/node_modules/*" \
  ! -path "*/dist/*" \
  ! -path "*/build/*" \
  ! -path "*/coverage/*" \
  ! -path "*/scripts/*" \
  ! -path "*/utils/*" \
  | sed "s#^\./##" \
  | sort
