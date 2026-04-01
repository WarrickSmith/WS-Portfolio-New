#!/bin/sh
set -eu

CONFIG_PATH="/app/dist/config.js"

mkdir -p "$(dirname "$CONFIG_PATH")"

node <<'EOF' > "$CONFIG_PATH"
const allowedKeys = [
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'EMAILJS_CONTACT_TEMPLATE_ID',
  'EMAILJS_PUBLIC_KEY',
  'RECAPTCHA_SITE_KEY',
  'DEBUG_VISITOR_TRACKING',
  'API_URL',
  'ENABLE_VISITOR_TRACKING',
]

const config = Object.fromEntries(
  allowedKeys.map((key) => [key, process.env[key] ?? ''])
)

process.stdout.write(`window.__ENV = ${JSON.stringify(config, null, 2)};\n`)
EOF

exec serve -s /app/dist -l 3000
