import { z } from "zod";

const vipSchema = z.object({
  description: z.string(),
  userId: z.coerce.number(),
});

export default vipSchema;
