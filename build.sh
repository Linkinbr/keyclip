#!/usr/bin/env bash
# Gera o .zip da pasta extension/ para enviar à Chrome Web Store.
set -euo pipefail
cd "$(dirname "$0")"

version=$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' extension/manifest.json)
out="dist/keyclip-$version.zip"

mkdir -p dist
rm -f "$out"
(cd extension && zip -r -q -X "../$out" . -x '*.DS_Store')
echo "Pacote gerado: $out"
