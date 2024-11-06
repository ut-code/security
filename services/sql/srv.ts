import { Database } from "bun:sqlite";
import type { Mail } from "./types.dev";

const dbName = `${import.meta.dir}/sqlite.db`;
const db = new Database(dbName);
const username = "駒場 優";

export function from(from: string) {
  return db
    .query(
      `SELECT * FROM mails WHERE "to" = '${username}' AND "from" = '${from}' ORDER BY date DESC`,
    )
    .all() as Mail[];
}
export function all() {
  return db
    .query(`SELECT * FROM mails WHERE "to" = '${username}' ORDER BY date DESC`)
    .all() as Mail[];
}

// don't expose this to users
export function everything() {
  return db.query("SELECT * FROM mails").all() as Mail[];
}
