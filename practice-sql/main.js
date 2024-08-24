const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));

const prisma = require("@prisma/client");
const client = new prisma.PrismaClient();

const buildDirPath = path.join(__dirname, "../build");
app.use(express.static(buildDirPath));
app.use("/css", express.static("css"));
app.use("/img", express.static("img"));

app.get("/practice-sql", async (request, response) => {
  let mails = [];
  const FROM = request.query.from;
  try {
    FROM
      ? (mails = await client.$queryRawUnsafe(
          `SELECT * FROM "Mail" WHERE "from" = '${FROM}' AND "to" = '駒場 優' ORDER BY "id" DESC;`,
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
    const template = fs.readFileSync("template.ejs", "utf-8");
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

app.listen(3000);
