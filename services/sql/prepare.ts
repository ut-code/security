const { Database } = await import("bun:sqlite");
import * as v from "valibot";
import * as yaml from "yaml";
import { Mail } from "./types.dev";

// just for the syntax highlighting
const sql = (a: TemplateStringsArray) => a.join("");
const dbName = `${import.meta.dir}/sqlite.db`;
const db = new Database(dbName, {
  create: true,
  readwrite: true,
  strict: true,
});
db.query(
  sql`
CREATE TABLE IF NOT EXISTS mails (
  "id" VARCHAR(16) NOT NULL,
  "from" VARCHAR(32) NOT NULL,
  "toType" VARCHAR(4) NOT NULL,
  "to" VARCHAR(32) NOT NULL,
  "date" VARCHAR(10) NOT NULL,
  "subject" VARCHAR(32) NOT NULL,
  "content" TEXT NOT NULL
);`,
).run();

const buf = await Bun.file(`${import.meta.dir}/data.yml`).text();
const data = yaml.parse(buf) as unknown;

if (!Array.isArray(data))
  throw new Error("Parsing Error: data from data.yml is not array");
for (const raw of data) {
  const mail = v.parse(Mail, raw);
  db.query(
    `
INSERT INTO mails ("id", "from", "toType", "to", "date", "subject", "content")
VALUES ($id, $from, $toType, $to, $date, $subject, $content);
`,
  ).run(mail);
}
