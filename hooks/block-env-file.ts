#!/usr/bin/env bun
/**
 * PreToolUse hook: Block Read/Grep access to .env files
 * Matcher: Read|Grep
 */

const input = await Bun.stdin.text();
const toolUse = JSON.parse(input);

const { tool_name, tool_input } = toolUse;

const pathsToCheck: string[] = [];

if (tool_name === "Read") {
  if (tool_input?.file_path) pathsToCheck.push(tool_input.file_path);
} else if (tool_name === "Grep") {
  if (tool_input?.path) pathsToCheck.push(tool_input.path);
}

const isEnvFile = pathsToCheck.some((p) =>
  /(^|\/)\.env(\.[^/]*)?$/.test(p)
);

if (isEnvFile) {
  console.error("🚫 Blocked: Reading .env files is not permitted.");
  process.exit(2);
}

process.exit(0);
