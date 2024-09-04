import fs from "fs";
import express from "express";
import ejs from "ejs";
import prisma from "@prisma/client";
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const client = new prisma.PrismaClient();

router.use("/css", express.static("./practice-sql/css"));
router.use("/img", express.static("./practice-sql/img"));

router.get("/", async (request, response) => {
  let mails = [];
  const FROM = request.query.from;
  try {
    FROM
      ? (mails = await client.$queryRawUnsafe(
          `SELECT * FROM "Mail" WHERE "from" = '${FROM}' AND "to" = '駒場 優' ORDER BY "id" DESC;`
        ))
      : (mails = await client.$queryRawUnsafe(`
        SELECT * FROM "Mail" WHERE "to" = '駒場 優' ORDER BY "id" DESC;
      `));
  } catch (e) {
    if (e instanceof prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2010") {
        console.log("invalid input");
      }
    }
    const template = fs.readFileSync("./practice-sql/template.ejs", "utf-8");
    const html = ejs.render(template, {
      queryFrom: request.query.from,
      mails: [],
      isError: true,
    });
    return response.send(html);
  }

  const extractedMails = mails.map((mail) => ({
    from: mail.from,
    toType: mail.toType,
    to: mail.to,
    date: mail.date,
    subject: mail.subject,
    content: mail.content,
  }));
  const template = fs.readFileSync("template.ejs", "utf-8");
  const html = ejs.render(template, {
    queryFrom: request.query.from,
    mails: extractedMails,
    isError: false,
  });
  response.send(html);
});

export default router;
