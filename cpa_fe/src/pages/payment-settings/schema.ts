import { z } from "zod";
import i18n from "../../i18n";

const schema = z.object({
  method: z.string(),
  info: z.string({
    required_error: i18n.t("util.required.non", {
      field: i18n.t("payments.info"),
    }),
  }),
  userId: z.coerce.number(),
});

export default schema;
