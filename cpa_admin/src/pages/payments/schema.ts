import { z } from "zod";
import i18n from "../../i18n";

const paymentSchema = z.object({
  id: z.coerce.number().optional(),
  status: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Status",
    }),
  }),
  description: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Opis",
    }),
  }),
  descriptionEng: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Opis na engleskom",
    }),
  }),
  rejectComment: z.string().optional(),
  rejectCommentEng: z.string().optional(),
});

export default paymentSchema;
