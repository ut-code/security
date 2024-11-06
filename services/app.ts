import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import * as sqlService from "./sql/srv";

const env = (name: string) => Bun.env[name] || panic(`env ${name} not found`);
const CORS_ORIGINS = env("CORS_ALLOW_ORIGINS").split(",");

export const app = new Elysia()
  .use(
    cors({
      origin: CORS_ORIGINS,
    }),
  )
  .get("/", "Hello from Elysia on Cloudflare Worker!")
  .get("/sql?from?", async (req) => {
    const query = req.query.from;
    if (query) {
      return await sqlService.from(query);
    }
    return await sqlService.all();
  });

function panic(msg: string): never {
  throw new Error(msg);
}
