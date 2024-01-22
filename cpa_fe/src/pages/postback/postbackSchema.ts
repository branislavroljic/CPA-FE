import { z } from "zod";
import i18n from "../../i18n";

const postbackSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string({
    required_error: i18n.t("util.required.non", {
      field: i18n.t("postback.name"),
    }),
  }),
  method: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("postback.method"),
    }),
  }),
  url: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("postback.url"),
    }),
  }),
  finalUrl: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("postback.finalUrl"),
    }),
  }),
  event: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("postback.event"),
    }),
  }),
  level: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("postback.level"),
    }),
  }),
  status: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("postback.status"),
    }),
  }),
  productId: z.coerce.number().optional(),
  userId: z.coerce.number(),
});

export default postbackSchema;
