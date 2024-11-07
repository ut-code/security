import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import type { Mail } from "./sql/types.dev";

const env = (name: string) => Bun.env[name] || panic(`env ${name} not found`);
const CORS_ORIGINS = env("CORS_ALLOW_ORIGINS").split(",");

export type Queryable = (arg: string) => Promise<Mail[]>;
export type Callable = () => Promise<Mail[]>;

export class App {
  _ = null;
  static create({ db }: { db: { from: Queryable; all: Callable } }) {
    return new Elysia()
      .use(
        cors({
          origin: CORS_ORIGINS,
        }),
      )
      .get("/", "Hello from Elysia on Cloudflare Worker!")
      .get("/sql?from?", async (req) => {
        const query = req.query.from;
        if (query) {
          return await db.from(query);
        }
        return await db.all();
      });
  }
}

function panic(msg: string): never {
  throw new Error(msg);
}
