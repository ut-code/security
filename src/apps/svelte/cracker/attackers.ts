import { type HashKind, check } from "./checkers";
export class Attacker {
  async iterate(
    alg: HashKind,
    hash: string,
    state: number,
    iterations: number,
  ) {
    let i = state;
    while (true) {
      const trial = generateNth(i++);
      if (await check(alg, trial, hash)) {
        return { ok: true as const, text: trial, used: i + 1 };
      }
      if (i >= state + iterations) {
        return {
          ok: false as const,
          used: iterations,
          peek: trial,
        };
      }
      i++;
    }
  }
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const chars =
  " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!`~@#$%^&*(){}[]_+-=<>,./\\'\"";

// FIXME: fix this fn not generating some charsets
export function generateNth(current: number): string {
  let digits = current;
  let retval = "";
  while (digits > 0) {
    const idx = (digits % chars.length) - 1;
    retval = chars[idx] + retval;
    digits = Math.floor(digits / chars.length);
  }
  return retval;
}
