import { z } from "zod";

const customPayoutSchema = z.object({
  payout: z.coerce.number(),
  userId: z.coerce.number(),
  productId: z.coerce.number(),
});

export default customPayoutSchema;
