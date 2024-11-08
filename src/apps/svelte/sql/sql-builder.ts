import type { Mail } from "./types";

export function sql(a: TemplateStringsArray, ...vals: string[]) {
  const args = Array.from(a);
  let query = "";
  while (true) {
    query += args.shift();
    if (vals.length === 0) break;
    query += `'${vals.shift()}'`;
  }
  return query;
}

export function from(from: string) {
  return sql`SELECT * FROM mails WHERE "to" = '駒場 優' AND "from" = '${from}' ORDER BY date DESC`;
}

export const all = sql`SELECT * FROM mails WHERE "to" = '駒場 優' ORDER BY date DESC`;

// don't expose this to users
export const everything = sql`SELECT * FROM mails`;

export const create = sql`

CREATE TABLE IF NOT EXISTS mails (
  "id" VARCHAR(16) NOT NULL,
  "from" VARCHAR(32) NOT NULL,
  "toType" VARCHAR(4) NOT NULL,
  "to" VARCHAR(32) NOT NULL,
  "date" VARCHAR(10) NOT NULL,
  "subject" VARCHAR(32) NOT NULL,
  "content" TEXT NOT NULL
);`;

export function insert(mail: Mail) {
  return sql`
INSERT INTO mails ("id", "from", "toType", "to", "date", "subject", "content")
VALUES (${mail.id}, ${mail.from}, ${mail.toType}, ${mail.to}, ${mail.date}, ${mail.subject}, ${mail.content});
`;
}
