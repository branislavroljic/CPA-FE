import { z } from "zod";
import i18n from "../../i18n";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const orderSchema = z.object({
  name: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("user.fullName"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("user.fullName"),
        num: 1,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("user.fullName"),
        num: standardMaxLength,
      }),
    }),
  country: z.string(),
  address: z
    .string({
      required_error: i18n.t("util.required.female", {
        field: i18n.t("company.address"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.address"),
        num: standardMaxLength,
      }),
    }),
  phoneNumber: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("user.phoneNumber"),
      }),
    })
    .regex(
      new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{3,10}$"),
      {
        message: i18n.t("util.invalidFormat", {
          field: i18n.t("user.phoneNumber"),
        }),
      }
    ),
  note: z
    .string()
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("order.note"),
        num: standardMaxLength,
      }),
    })
    .optional(),
  quantity: z.coerce.number({
    invalid_type_error: i18n.t("util.invalidFormat", {
      field: i18n.t("order.quantity"),
    }),
  }),
  totalPrice: z.coerce.number({
    invalid_type_error: i18n.t("util.invalidFormat", {
      field: i18n.t("order.totalPrice"),
    }),
  } ),
  productId: z.coerce.number(),
  userId: z.coerce.number(),
});

export default orderSchema;
