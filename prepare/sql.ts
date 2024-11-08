import { $ } from "bun";
import * as v from "valibot";
import yaml from "yaml";
import { Mail } from "src/apps/svelte/sql/types";
import Database from "bun:sqlite";
import * as builder from "src/apps/svelte/sql/sql-builder";

const Data = v.array(Mail);
export default async function () {
  // create sqlite file
  const text = await Bun.file(`${import.meta.dir}/sql.data.yaml`).text();
  const parsed: unknown = yaml.parse(text);

  const data = v.parse(Data, parsed);

  const path = `${import.meta.dir}/../public/sql-data.sqlite`;
  try {
    // sqlite file doesn't exist at first prepare execution.
    await $`rm ${path}`;
  } catch (_) {}
  const db = new Database(path);
  db.exec(builder.create);
  for (const mail of data) {
    db.exec(builder.insert(mail));
  }
}
