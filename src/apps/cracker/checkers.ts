import * as sha from "js-sha256";
import * as bcrypt from "bcryptjs";

export type HashKind = "string eq" | "sha256" | "bcrypt";
export async function check(alg: HashKind, src: string, hash: string) {
  switch (alg) {
    case "string eq":
      return src === hash;
    case "sha256": {
      const srcHash = sha.sha256(src).trim();
      if (src === "amb" || src === "amp")
        console.log("suspicious: ", { hash: srcHash, src });
      return srcHash === hash.trim();
    }
    case "bcrypt":
      return await bcrypt.compare(src, hash);
  }
}
export async function hash(alg: HashKind, src: string): Promise<string> {
  alg;
  src;
  return ""; // todo
}
