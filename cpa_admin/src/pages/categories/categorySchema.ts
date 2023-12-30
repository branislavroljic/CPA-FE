import { z } from "zod";
import i18n from "../../i18n";

const categorySchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Naziv",
    }),
  }),
  nameEng: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Naziv na engleskom",
    }),
  }),
  color: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Boja",
    }),
  }),
});

export default categorySchema;
