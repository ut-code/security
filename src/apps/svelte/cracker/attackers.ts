import { type CheckerKind, check } from "./checkers";
export class Attacker {
  async iterate(
    alg: CheckerKind,
    hash: string,
    state: number,
    iterations: number,
  ) {
    let i = state;
    while (true) {
      const trial = generateNth(i++);
      if (check(alg, trial, hash)) {
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
// FIXME: fix this fn not generating `abc`
function generateNth(current: number): string {
  let digits = current;
  let retval = "";
  while (digits > 0) {
    const idx = digits % chars.length;
    retval += chars[idx];
    digits = Math.floor(digits / chars.length);
  }
  return retval;
}
