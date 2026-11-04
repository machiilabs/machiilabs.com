/**
 * Exactly what each sent issue looked like when it went out, written by
 * `npm run newsletter freeze`. The routes serve these instead of re-rendering,
 * so a later design change can't rewrite the archive. Generated; don't edit.
 */

import frozen_2026_01 from "./2026-01.json";

export type FrozenIssue = { web: string; email: string; text: string };

export const FROZEN_ISSUES: Record<string, FrozenIssue> = {
  "2026-01": frozen_2026_01,
};
