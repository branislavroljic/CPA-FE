import { z } from "zod";
import i18n from "../../i18n";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const orderSchema = z.object({
  name: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("user.name"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("user.name"),
        num: 1,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("user.name"),
        num: standardMaxLength,
      }),
    }),
  country: z
    .string({
      required_error: i18n.t("util.required.female", {
        field: i18n.t("user.country"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("user.country"),
        num: standardMaxLength,
      }),
    }),
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
    .string()
    .regex(
      new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{3,10}$"),
      {
        message: i18n.t("util.invalidFormat", {
          field: i18n.t("user.phoneNumber"),
        }),
      }
    )
    .optional(),
  note: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("order.note"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("order.note"),
        num: 1,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("order.note"),
        num: standardMaxLength,
      }),
    }),
  quantity: z.coerce.number(),
  totalPrice: z.coerce.number(),
  productId: z.coerce.number(),
  userId: z.coerce.number(),
});

export default orderSchema;
