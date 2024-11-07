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
