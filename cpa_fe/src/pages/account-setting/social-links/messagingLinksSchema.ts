import { z } from "zod";

const messagingLinksSchema = z.object({
  skypeLink: z.string().url().optional(),
  telegramLink: z.string().url().optional(),
  whatsappLink: z.string().url().optional(),
});

export default messagingLinksSchema;
