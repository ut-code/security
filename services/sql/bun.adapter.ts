import { Database } from "bun:sqlite";
import type { Mail } from "./types.dev";
import { prepare } from "./prepare";
import * as builder from "./builder";

const db = new Database(":memory:");
await prepare((query) => db.run(query));

export async function from(u: string): Promise<Mail[]> {
	return db.query(builder.from(u)).all() as Mail[];
}
export async function all(): Promise<Mail[]> {
	return db.query(builder.all).all() as Mail[];
}
export async function everything(): Promise<Mail[]> {
	return db.query(builder.everything).all() as Mail[];
}
