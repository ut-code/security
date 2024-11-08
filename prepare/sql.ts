import { $ } from "bun";
import * as v from "valibot";
import yaml from "yaml";
import { Mail } from "./../src/apps/svelte/sql/types";

export default async function () {
  // copy sql.js to public
  await $`
cd ${import.meta.dir}; cd ..;
cp ./node_modules/sql.js public/ -r;
`;

  const text = await Bun.file(`${import.meta.dir}/sql.data.yaml`).bytes();
  const parsed: unknown = yaml.parse(String.fromCharCode(...text));

  const Data = v.array(Mail);

  const data = v.parse(Data, parsed);

  const base64 = btoa(JSON.stringify(data));

  Bun.file(`${import.meta.dir}/../src/pages/apps/sql-data.json.base64.js`)
    .writer()
    .write(`export default "${base64}"`);
}
