import initSqlJs from "sql.js";
import { create, insert } from "./sql-builder";
import type { Mail } from "./types";

type Base64String = string;
/* todo
	const buf = await (await fetch("/srv/")).arrayBuffer();
	if (!buf) throw new Error("Couldn't fetch required SQLite file");
*/

// export async function init(source: Base64String) {
// 	const initializer = (await import("@sqlite.org/sqlite-wasm")).default;
// 	const sqlite3 = await initializer();
// 	const db = new sqlite3.oo1.DB("/mydb.sqlite3", "ct");
// 	const mails: Mail[] = JSON.parse(atob(source));

// 	db.exec(create);
// 	for (const mail of mails) {
// 		db.exec(insert(mail));
// 	}

// 	return (stmt: string) => db.selectArrays(stmt);
// }

export async function init(source: Base64String) {
  const db = new (
    await initSqlJs({
      locateFile() {
        return "/sql-wasm.wasm";
      },
    })
  ).Database();
  const mails: Mail[] = JSON.parse(atob(source));

  db.exec(create);
  for (const mail of mails) {
    db.exec(insert(mail));
  }

  return (stmt: string) => {
    // are there really no other ways to do this? db.exec() doesn't work as expected..
    const exec = db.prepare(stmt);
    const result = [];
    while (exec.step()) {
      result.push(exec.getAsObject());
    }
    return result;
  };
}
