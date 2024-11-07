import initSqlJs from "sql.js";

export async function init() {
  const sqljs = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });

  const db = new sqljs.Database();

  // todo: init database with data

  return (stmt: string) => db.exec(stmt);
}
