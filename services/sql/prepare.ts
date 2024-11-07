import type { Database } from "sqlite3";
import * as v from "valibot";
import * as yaml from "yaml";
import { Mail } from "./types.dev";
import { sql } from "./builder";

export async function prepare(exec: (query: string) => void) {
  exec(sql`
CREATE TABLE IF NOT EXISTS mails (
  "id" VARCHAR(16) NOT NULL,
  "from" VARCHAR(32) NOT NULL,
  "toType" VARCHAR(4) NOT NULL,
  "to" VARCHAR(32) NOT NULL,
  "date" VARCHAR(10) NOT NULL,
  "subject" VARCHAR(32) NOT NULL,
  "content" TEXT NOT NULL
);`);

  await Bun.sleep(100);

  const buf = await Bun.file(`${import.meta.dir}/data.yml`).text();
  const data = yaml.parse(buf) as unknown;

  if (!Array.isArray(data))
    throw new Error("Parsing Error: data from data.yml is not array");

  for (const raw of data) {
    const m = v.parse(Mail, raw);
    exec(sql`
INSERT INTO mails ("id", "from", "toType", "to", "date", "subject", "content")
VALUES (${m.id}, ${m.from}, ${m.toType}, ${m.to}, ${m.date}, ${m.subject}, ${m.content});
`);
  }
  await Bun.sleep(100);
}
