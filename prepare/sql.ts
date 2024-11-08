import { $ } from "bun";
import * as v from "valibot";
import yaml from "yaml";
import { Mail } from "./../src/apps/svelte/sql/types";
import Database from "bun:sqlite";
import * as builder from "../src/apps/svelte/sql/sql-builder";

const Data = v.array(Mail);
export default async function () {
  // copy sql.js to public
  await $`
cd ${import.meta.dir}; cd ..;
cp ./node_modules/sql.js/dist/sql-wasm.wasm public/sql-wasm.wasm ;
`;

  // create sqlite file
  const text = await Bun.file(`${import.meta.dir}/sql.data.yaml`).text();
  const parsed: unknown = yaml.parse(text);

  const data = v.parse(Data, parsed);

  const path = `${import.meta.dir}/../public/sql-data.sqlite`;
  await $`rm ${path}`.catch();
  const db = new Database(path);
  db.exec(builder.create);
  for (const mail of data) {
    db.exec(builder.insert(mail));
  }
}
