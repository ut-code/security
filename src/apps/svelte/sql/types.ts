import * as v from "valibot";

export const Mail = v.object({
  id: v.string(),
  from: v.string(),
  toType: v.string(),
  to: v.string(),
  date: v.string(),
  subject: v.string(),
  content: v.pipe(
    v.string(),
    v.transform((prev) => prev.replaceAll("\n", "<br />")),
  ),
});

export type Mail = v.InferInput<typeof Mail>;
