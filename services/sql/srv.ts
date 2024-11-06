import Database from "better-sqlite3";
import type { Mail } from "./types.dev";

const fallback = __filename.split("/");
fallback.pop();
const dbName = `${import.meta.dir ?? fallback.pop()}/sqlite.db`;
const db = new Database(dbName, {
  readonly: true,
});
const username = "駒場 優";

export function from(from: string) {
  return db
    .prepare(
      `SELECT * FROM mails WHERE "to" = '${username}' AND "from" = '${from}' ORDER BY date DESC`,
    )
    .all() as Mail[];
}
export function all() {
  return db
    .prepare(
      `SELECT * FROM mails WHERE "to" = '${username}' ORDER BY date DESC`,
    )
    .all() as Mail[];
}

// don't expose this to users
export function everything() {
  return db.prepare("SELECT * FROM mails").all() as Mail[];
}
