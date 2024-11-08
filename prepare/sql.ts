import * as v from "valibot";
import { Mail } from "./../src/apps/svelte/sql/types";
import yaml from "yaml";

export default async function () {
  const text = await Bun.file(`${import.meta.dir}/sql.data.yaml`).bytes();
  const parsed: unknown = yaml.parse(String.fromCharCode(...text));

  const Data = v.array(Mail);

  const data = v.parse(Data, parsed);

  const base64 = btoa(JSON.stringify(data));

  Bun.file(`${import.meta.dir}/../public/sql/data.json.base64`)
    .writer()
    .write(base64);
}
