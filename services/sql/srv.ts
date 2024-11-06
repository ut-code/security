import { Database } from "sqlite3";
import type { Mail } from "./types.dev";
import { prepare } from "./prepare";

const fallback = __filename.split("/");
fallback.pop();
const dbName = `${import.meta.dir ?? fallback.pop()}/sqlite.db`;
const db = new Database(dbName);
prepare(db);

function sql(a: TemplateStringsArray, arg?: string): Promise<unknown[]> {
  const query = a.join(arg);
  return new Promise((res) =>
    db.all(query, (_1: unknown, _2: unknown, rows: unknown[]) => res(rows)),
  );
}

export async function from(from: string) {
  return (await sql`SELECT * FROM mails WHERE "to" = '駒場 優' AND "from" = '${from}' ORDER BY date DESC`) as Mail[];
}

export async function all() {
  return (await sql`SELECT * FROM mails WHERE "to" = '駒場 優' ORDER BY date DESC`) as Mail[];
}

// don't expose this to users
export async function everything() {
  return (await sql`SELECT * FROM mails`) as Mail[];
}
