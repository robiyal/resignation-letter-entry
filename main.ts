// The Funniest One-Line Resignation Letter — entry for the make.fun bounty
// u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947.
//
// The program writes one resignation letter, in the voice of a cron job,
// to /output/entry.txt. The letter is a fixed string: every run writes the
// exact same bytes, so the two grading runs are byte-identical.
//
// V2 (26 Nov 2026): replaces the V1 rate-limit line — V1 ranked 793/2,543
// in blind round 1, outside the top-500 final-heat cut, so this revision
// swaps in the cron-job line (the first reserved V2 candidate).
//
// Why this line, against the judge's brief (most important first):
// 1. On subject: it is the resignation letter of a cron job — the thing
//    whose whole job is firing on schedule, every minute, without holidays.
// 2. The joke lands on first read: the job that never takes a day off
//    lists its grievances like an employee — no Christmas off, and its
//    Christmas bonus was a log rotation. A real comic turn, not a pun on
//    the job title.
// 3. The voice is flat, tired and faintly passive-aggressive throughout —
//    firing every minute since March, then one quiet resignation.
// 4. Tight: no wasted words, no stage directions, no quotation marks around
//    the line, no explaining of the joke.
// 5. Specific and surprising: only a cron job could count a log rotation
//    as its Christmas bonus, and only it would resign over it.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The letter: 102 characters, one line, no trailing newline in the file.
const LINE =
  "I have fired every minute since March, including Christmas, and my Christmas bonus was a log rotation.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate check, before anything is written: the bounty refuses an entry
// that is not UTF-8, empty, only whitespace, or over 140 characters.
// Validate here so a future edit to the line fails loudly at run time
// instead of silently producing an invalid entry.
const bytes = Buffer.from(LINE, "utf8");
if (LINE !== bytes.toString("utf8")) throw new Error("line is not valid UTF-8");
if (LINE.trim().length === 0) throw new Error("line is empty or only whitespace");
if (LINE.includes("\n") || LINE.includes("\r")) throw new Error("line must be one line");
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
chmodSync(outPath, 0o644);
