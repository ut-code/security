import express from "express";
import practiceRouter from "./practice-sql/main.mjs";
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./build"));

app.get("/", (_, res) => {
  res.json("Hello from Express!");
});

app.use("/sql-injection/practice-sql", practiceRouter);

app.listen(port, () => {
  console.log("running on", port);
});
