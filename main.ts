// One Line, No Deadline Met — make.fun entry
// Writes a single-line joke excusing a missed deadline to entry.txt.
// The gate requires UTF-8 text of 1 to 200 characters, not only whitespace,
// so the file holds exactly the line and nothing else (no trailing newline).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function buildEntryLine(): string {
  // The excuse itself: the deadline marched past like a parade.
  return "I didn't miss the deadline — I watched it march past my window like a parade I was supposed to be in.";
}

function resolveOutputPath(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) return process.env.MAKEFUN_OUTPUT_DIR;
  if (process.env.OUTPUT_PATH) return process.env.OUTPUT_PATH;
  if (process.env.MAKEFUN_BOT_DIR) return "/output";
  return join(process.cwd(), "output");
}

function main(): void {
  const line = buildEntryLine();
  // Kit gate: entry must be UTF-8 text of 1 to 200 characters, not only whitespace.
  if (line.length < 1 || line.length > 200 || line.trim() === "") {
    throw new Error("entry fails the kit gate: must be 1-200 non-whitespace characters");
  }
  const outDir = resolveOutputPath();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

main();
