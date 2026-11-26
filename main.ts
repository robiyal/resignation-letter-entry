// Resignation Letter V3 — "The Exponential Backoff Resigns"
// Writes one fixed line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// The line is the entry: a one-line resignation letter in the voice of an
// exponential backoff that has finally reached retirement age.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My exponential backoff has finally reached retirement age, so I am taking it.";

// Gate: the entry must be UTF-8 text of 1 to 140 characters, one line,
// not only white space — the same rule the sealed scorer applies.
if (
  LINE.length < 1 ||
  LINE.length > 140 ||
  LINE.includes("\n") ||
  LINE.trim().length === 0
) {
  console.error("entry line fails the gate (1-140 chars, one line)");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, LINE, "utf8");
chmodSync(entryPath, 0o644);
