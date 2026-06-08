#!/usr/bin/env bash
set -euo pipefail

MAI_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SETTINGS="$HOME/.claude/settings.json"

echo ""
echo "MAI Collective — Installer"
echo "=========================="
echo ""

# Prerequisites check
if ! command -v bun &>/dev/null; then
  echo "Error: Bun is required. Install from https://bun.sh"
  exit 1
fi
if ! command -v claude &>/dev/null; then
  echo "Error: Claude Code CLI is required. Install from https://claude.ai/code"
  exit 1
fi

# Prompt for user config
read -rp "Your name (e.g. Tammy): " USER_NAME
read -rp "Assistant name (default: Kai): " DA
DA="${DA:-Kai}"
read -rp "Timezone (e.g. America/Los_Angeles): " TIME_ZONE

echo ""

# Write config/user.yaml
mkdir -p "$MAI_DIR/config"
cat > "$MAI_DIR/config/user.yaml" <<EOF
USER_NAME: "$USER_NAME"
DA: "$DA"
TIME_ZONE: "$TIME_ZONE"
EOF
echo "✓ Written config/user.yaml"

# Wire commands symlink
if [ -L "$HOME/.claude/commands" ]; then
  echo "✓ Commands symlink already in place"
elif [ -d "$HOME/.claude/commands" ]; then
  mv "$HOME/.claude/commands" "$HOME/.claude/commands.bak"
  ln -s "$MAI_DIR/commands" "$HOME/.claude/commands"
  echo "✓ Commands symlinked (backup at ~/.claude/commands.bak)"
else
  mkdir -p "$HOME/.claude"
  ln -s "$MAI_DIR/commands" "$HOME/.claude/commands"
  echo "✓ Commands symlinked"
fi

# Install hook dependencies
if [ -f "$MAI_DIR/hooks/package.json" ]; then
  echo "Installing hook dependencies..."
  (cd "$MAI_DIR/hooks" && bun install --frozen-lockfile 2>/dev/null || bun install)
  echo "✓ Hook dependencies installed"
fi

# Inject MAI wiring into ~/.claude/settings.json
if [ ! -f "$SETTINGS" ]; then
  echo "{}" > "$SETTINGS"
fi

HOOKS_JSON=$(cat <<ENDJSON
{
  "SessionStart": [{"matcher":"*","hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/initialize-session.ts"},{"type":"command","command":"bun run \$MAI_DIR/hooks/load-core-context.ts"},{"type":"command","command":"bun run \$MAI_DIR/hooks/capture-all-events.ts --event-type SessionStart"}]}],
  "PreToolUse": [{"matcher":"Read|Grep|Write|Edit","hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/block-env-file.ts"}]},{"matcher":"Bash","hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/security-validator.ts"}]},{"matcher":"*","hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/capture-all-events.ts --event-type PreToolUse"}]}],
  "PostToolUse": [{"matcher":"*","hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/capture-all-events.ts --event-type PostToolUse"}]}],
  "UserPromptSubmit": [{"matcher":"*","hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/update-tab-titles.ts"},{"type":"command","command":"bun run \$MAI_DIR/hooks/capture-all-events.ts --event-type UserPromptSubmit"}]}],
  "Stop": [{"hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/stop-hook-voice.ts"},{"type":"command","command":"bun run \$MAI_DIR/hooks/stop-hook.ts"},{"type":"command","command":"bun run \$MAI_DIR/hooks/capture-all-events.ts --event-type Stop"}]}],
  "SubagentStop": [{"hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/subagent-stop-hook-voice.ts"},{"type":"command","command":"bun run \$MAI_DIR/hooks/subagent-stop-hook.ts"},{"type":"command","command":"bun run \$MAI_DIR/hooks/capture-all-events.ts --event-type SubagentStop"}]}],
  "SessionEnd": [{"hooks":[{"type":"command","command":"bun run \$MAI_DIR/hooks/capture-session-summary.ts"},{"type":"command","command":"bun run \$MAI_DIR/hooks/capture-all-events.ts --event-type SessionEnd"}]}]
}
ENDJSON
)

# Use bun to merge settings (safe JSON manipulation)
bun -e "
const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('$SETTINGS', 'utf8'));
settings.env = settings.env || {};
settings.env.MAI_DIR = '$MAI_DIR';
settings.env.USER_NAME = '$USER_NAME';
settings.env.DA = '$DA';
settings.env.TIME_ZONE = '$TIME_ZONE';
settings.env.MAI_SOURCE_APP = '$DA';
settings.hooks = $HOOKS_JSON;
fs.writeFileSync('$SETTINGS', JSON.stringify(settings, null, 2));
"
echo "✓ ~/.claude/settings.json updated"

echo ""
echo "Installation complete. Start a new Claude Code session to activate MAI."
echo ""
