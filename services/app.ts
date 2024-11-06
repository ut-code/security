import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import * as sqlService from "./sql/srv";

export const app = new Elysia()
  .use(
    cors({
      origin:
        Bun.env.CORS_ALLOW_ORIGINS?.split(",") ||
        panic("env CORS_ALLOW_ORIGINS not found"),
    }),
  )
  .get("/", "Hello from Elysia on Cloudflare Worker!")
  .get("/sql?from?", (req) => {
    const query = req.query.from;
    if (query) {
      return sqlService.from(query);
    }
    return sqlService.all();
  });

function panic(msg: string): never {
  throw new Error(msg);
}
