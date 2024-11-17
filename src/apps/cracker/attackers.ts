import { type HashKind, check } from "./checkers";

export async function iterate(
  alg: HashKind,
  hash: string,
  state: number,
  iterations: number,
) {
  let trial = "";
  for (let i = 0; i < iterations; i++) {
    trial = generateNth(i + state);
    if (await check(alg, trial, hash)) {
      return { ok: true as const, text: trial, used: i };
    }
  }
  if (!trial) throw new Error("zero iterations");
  return {
    ok: false as const,
    used: iterations,
    peek: trial,
  };
}

const chars =
  " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!`~@#$%^&*(){}[]_+-=<>,./\\'\"";

// FIXME: fix this fn not generating some charsets
export function generateNth(current: number): string {
  let digits = current;
  let retval = "";
  while (digits > 0) {
    const idx = digits % chars.length;
    retval = chars[idx] + retval;
    digits = Math.floor(digits / chars.length);
  }
  return retval;
}
