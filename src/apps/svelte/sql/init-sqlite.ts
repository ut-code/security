import { create, insert } from "./sql-builder";
import type { Mail } from "./types";

type Base64String = string;
/* todo
	const buf = await (await fetch("/srv/")).arrayBuffer();
	if (!buf) throw new Error("Couldn't fetch required SQLite file");
*/

export async function init(source: Base64String) {
  const mails: Mail[] = JSON.parse(atob(source));
  const sqlite = await import("@sqlite.org/sqlite-wasm");
  const db = new sqlite.Database(":memory:");

  db.exec(create);
  for (const mail of mails) {
    db.exec(insert(mail));
  }

  return (stmt: string) => db.selectArrays(stmt);
}
