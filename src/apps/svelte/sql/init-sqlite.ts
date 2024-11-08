import initSqlJs from "sql.js";
import { Mail } from "./types";
import * as v from "valibot";

export async function init(sqlite: Uint8Array) {
  const db = new (
    await initSqlJs({
      locateFile() {
        return "/sql-wasm.wasm";
      },
    })
  ).Database(sqlite);

  return (stmt: string) => {
    // are there really no other ways to do this? db.exec() doesn't work as expected..
    const exec = db.prepare(stmt);
    const result = [];
    while (exec.step()) {
      result.push(exec.getAsObject());
    }
    if (import.meta.env.PROD) return result as Mail[];
    try {
      return v.parse(v.array(Mail), result);
    } catch (err) {
      console.error("Failed to parse some of stmts to Mail", err);
      console.error("instead got: ", result);
      return result as Mail[];
    }
  };
}
