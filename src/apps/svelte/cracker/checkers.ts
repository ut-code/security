export type CheckerKind = "string eq";
export function check(alg: CheckerKind, src: string, hash: string) {
  switch (alg) {
    case "string eq":
      return src === hash;
  }
}
