import { test, expect } from "bun:test";
import { generateNth } from "./attackers";

const texts: string[] = [];
for (let i = 0; i < 10_000_000; i++) {
  texts.push(generateNth(i));
}
test("generateNth visits all characters", () => {
  expect(texts).toContain("");
  expect(texts).toContain("a");
  expect(texts).toContain('"');
  expect(texts).toContain("a ");
  expect(texts).toContain("-~");
  expect(texts).toContain("'\"");
  expect(texts).toContain("aaa");
  expect(texts).toContain("cod");
  expect(texts).toContain("abc");
  expect(texts).toContain("aob");
  expect(texts).toContain(")");
});
