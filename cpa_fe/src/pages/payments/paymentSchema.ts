import { z } from "zod";
import i18n from "../../i18n";

const paymentSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: i18n.t("util.number", {
        field: i18n.t("payments.amount"),
      }),
      required_error: i18n.t("util.required.male", {
        field: i18n.t("payments.amount"),
      }),
    })
    .min(0, {
      message: i18n.t("util.min", {
        field: i18n.t("payments.amount"),
        num: 0,
      }),
    }),
  userPaymentMethodId: z.coerce.number(),
  userId: z.coerce.number(),
});

export default paymentSchema;
