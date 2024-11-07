import { test, expect } from "bun:test";
import { sql } from "./builder";

test("builder", () => {
  expect(sql`SELECT * FROM users;`).toBe("SELECT * FROM users;");
  expect(sql`SELECT * FROM users WHERE id = ${"abc"};`).toBe(
    "SELECT * FROM users WHERE id = 'abc';",
  );
  expect(sql`SELECT ${"a"} + ${"b"} AS "result";`).toBe(
    "SELECT 'a' + 'b' AS \"result\";",
  );
  expect(
    sql`SELECT ${"many"} ${"more"} ${"args"} ${"and"} ${"still"} ${"be"} ${"fine"}`,
  ).toBe("SELECT 'many' 'more' 'args' 'and' 'still' 'be' 'fine'");
});
