import { Elysia } from "elysia";
import * as sqlService from "./sql/srv";

export const app = new Elysia()
  .get("/", "Hello from Elysia on Cloudflare Worker!")
  .get("/sql?from?", (req) => {
    const query = req.query.from;
    if (query) {
      return sqlService.from(query);
    }
    return sqlService.all();
  });
