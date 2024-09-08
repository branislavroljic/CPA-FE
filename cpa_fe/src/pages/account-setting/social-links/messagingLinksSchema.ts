import { z } from "zod";

const messagingLinksSchema = z.object({
  skypeLink: z.string().optional(),
  telegramLink: z.string().optional(),
  whatsappLink: z.string().optional(),
});

export default messagingLinksSchema;
