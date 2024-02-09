import { z } from "zod";

const accountManagerSchema = z.object({
  accountManagerId: z.coerce.number(),
});

export default accountManagerSchema;
