import { z } from "zod";
import i18n from "../../i18n";

const domainSchema = z.object({
  domain: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("domain.domain"),
    }),
  }),
  type: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("domain.type"),
    }),
  }),
  userId: z.coerce.number(),
});

export default domainSchema;
