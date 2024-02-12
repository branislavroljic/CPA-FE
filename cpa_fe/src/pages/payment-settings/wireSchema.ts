import { z } from "zod";
import i18n from "../../i18n";

const wireSchema = z.object({
  bankName: z.string({
    required_error: i18n.t("util.required.female", {
      field: i18n.t("payments.bankName"),
    }),
  }),
  accountHolder: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("payments.accountHolder"),
    }),
  }),
  country: z.string({
    required_error: i18n.t("util.required.female", {
      field: i18n.t("user.country"),
    }),
  }),
  iban: z.string({
    required_error: i18n.t("util.required.male", {
      field: "IBAN",
    }),
  }),
  swift: z.string({
    required_error: i18n.t("util.required.male", {
      field: "SWIFT",
    }),
  }),
  userId: z.coerce.number(),
});

export default wireSchema;
