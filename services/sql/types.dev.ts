import * as v from "valibot";

export const Mail = v.object({
  id: v.string(),
  from: v.string(),
  toType: v.string(),
  to: v.string(),
  date: v.string(),
  subject: v.string(),
  content: v.string(),
});

export type Mail = v.InferInput<typeof Mail>;
