import { z } from "zod";

const socialMediaLinksSchema = z.object({
  facebookLink: z.string().optional(),
  googleLink: z.string().optional(),
  twitterLink: z.string().optional(),
  linkedinLink: z.string().optional(),
  instagramLink: z.string().optional(),
});

export default socialMediaLinksSchema;
