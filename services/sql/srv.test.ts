import { expect, test } from "bun:test";
import * as v from "valibot";
import * as srv from "./srv";
import { Mail } from "./types.dev";

test("injectable", () => {
  expect(srv.from(`' OR '' = '`).length).toBeGreaterThan(0);
});

test("type", () => {
  const val = srv.everything();
  v.parse(Mail, val[0]);
});

test("all", () =>
  expect(srv.everything().find((m) => m.id === "5")).toEqual({
    id: "5",
    from: "ジョン・スミス",
    toType: "to",
    to: "マイク・ジョンソン",
    date: "10/29 08:30",
    subject: "資金とタイミングについて",
    content: `マイク・ジョンソン様
ご協力ありがとうございます。選手たちの不安を取り除くため、選手一人あたりの報酬を3万ドルに引き上げることにしました。これで彼らもリスクに見合った報酬だと納得してくれるでしょう。
話を進める際は、ワールドシリーズ開幕前に、信頼できる選手だけに少しずつ情報を共有してください。彼らが同意した段階で、さらに他の選手にも話を広げてください。全員の同意が得られるまでは、計画の全容を明かさないようお願いいたします。
この話が漏れると、我々全員にとって重大な問題となります。ですから、選手たちの意思をしっかり確認した上で、次のステップに進んでください。
すべてが整った段階で、詳細な指示を再度お送りします。それまでの間は、慎重に冷静に進めてください。
ジョン・スミス
`,
  }));
