import * as sha from "js-sha256";
import * as bcrypt from "bcryptjs";

export type CheckerKind = "string eq" | "sha256" | "bcrypt";
export function check(alg: CheckerKind, src: string, hash: string) {
  switch (alg) {
    case "string eq":
      return src === hash;
    case "sha256":
      return sha.sha256(src) === hash;
    case "bcrypt":
      return;
  }
}
