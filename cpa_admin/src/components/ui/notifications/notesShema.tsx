import { z } from "zod";

const notesSchema = z.object({
  title: z.string(),
  titleEng: z.string(),
  text: z.string(),
  textEng: z.string(),
});

export default notesSchema;
