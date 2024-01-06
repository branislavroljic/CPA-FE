import { z } from "zod";
import i18n from "../../i18n";

const orderSchema = z.object({
  id: z.coerce.number().optional(),
  status: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Status",
    }),
  }),
});

export default orderSchema;
