import Database from "bun:sqlite";
import { expect, test } from "bun:test";
import * as v from "valibot";
import { sql } from "./sql-builder";
import { Mail } from "./types";

// init DB
const db = new Database(
  `${import.meta.dir}/../../../../public/sql-data.sqlite`,
);

// testing
function exec(query: string) {
  try {
    return db.query(query).all();
  } catch (err) {
    console.error(`Failed at query ${query}`);
    console.error(err);
    throw null;
  }
}
const player = "駒場 優";

test("builder", () => {
  expect(sql`SELECT * FROM users;`).toBe("SELECT * FROM users;");
  expect(sql`SELECT * FROM users WHERE id = ${"abc"};`).toBe(
    "SELECT * FROM users WHERE id = 'abc';",
  );
  expect(sql`SELECT ${"a"} + ${"b"} AS "result";`).toBe(
    "SELECT 'a' + 'b' AS \"result\";",
  );
  expect(
    sql`SELECT ${"many"} ${"more"} ${"args"} ${"and"} ${"still"} ${"be"} ${"fine"}`,
  ).toBe("SELECT 'many' 'more' 'args' 'and' 'still' 'be' 'fine'");
});

const injectQuery = "' OR '' = '";
test("injectable", () => {
  expect(
    exec(
      sql`SELECT * FROM mails WHERE "to" = ${player} AND "from" = ${injectQuery}`,
    ).length,
  ).toBeGreaterThan(0);
});

test("type", () => {
  const val = exec(sql`SELECT * FROM mails`);
  v.parse(Mail, val[0]);
});

test("all", () =>
  expect(
    exec(sql`SELECT * FROM mails`).find((m) => (m as Mail).id === "5"),
  ).toEqual({
    id: "5",
    from: "ジョン・スミス",
    toType: "to",
    to: "マイク・ジョンソン",
    date: "10/29 08:30",
    subject: "資金とタイミングについて",
    content:
      "マイク・ジョンソン様<br />ご協力ありがとうございます。選手たちの不安を取り除くため、選手一人あたりの報酬を3万ドルに引き上げることにしました。これで彼らもリスクに見合った報酬だと納得してくれるでしょう。<br />話を進める際は、ワールドシリーズ開幕前に、信頼できる選手だけに少しずつ情報を共有してください。彼らが同意した段階で、さらに他の選手にも話を広げてください。全員の同意が得られるまでは、計画の全容を明かさないようお願いいたします。<br />この話が漏れると、我々全員にとって重大な問題となります。ですから、選手たちの意思をしっかり確認した上で、次のステップに進んでください。<br />すべてが整った段階で、詳細な指示を再度お送りします。それまでの間は、慎重に冷静に進めてください。<br />ジョン・スミス<br />",
  }));
