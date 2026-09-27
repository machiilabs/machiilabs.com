#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-3000}"

LAN_IP=""
for iface in en0 en1 en2 bridge0; do
  if LAN_IP="$(ipconfig getifaddr "$iface" 2>/dev/null)" && [[ -n "$LAN_IP" ]]; then
    break
  fi
done

echo "Local:  http://localhost:${PORT}"
if [[ -n "$LAN_IP" ]]; then
  echo "iPad (same Wi‑Fi): http://${LAN_IP}:${PORT}"
else
  echo "iPad: no LAN address found. Join Wi‑Fi, then restart."
fi

exec npx next dev --hostname 0.0.0.0 --port "$PORT" "$@"
