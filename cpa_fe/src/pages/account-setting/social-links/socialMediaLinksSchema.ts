import { z } from "zod";

const socialMediaLinksSchema = z.object({
  facebookLink: z.string().url().optional(),
  googleLink: z.string().url().optional(),
  twitterLink: z.string().url().optional(),
  linkedinLink: z.string().url().optional(),
  instagramLink: z.string().url().optional(),
});

export default socialMediaLinksSchema;
