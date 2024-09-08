import { z } from "zod";
import i18n from "../../../i18n";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const companyInfoSchema = z.object({
  companyName: z
    .string({
      required_error: i18n.t("util.required.female", {
        field: i18n.t("company.companyName"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("company.companyName"),
        num: 1,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.companyName"),
        num: standardMaxLength,
      }),
    }),
  country: z
    .string({
      required_error: i18n.t("util.required.female", {
        field: i18n.t("company.country"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.country"),
        num: standardMaxLength,
      }),
    }),
  city: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("company.city"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.city"),
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
  zipcode: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("company.zipcode"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.zipcode"),
        num: standardMaxLength,
      }),
    }),
  companyEmail: z.string().email({
    message: i18n.t("util.invalidFormat", {
      field: i18n.t("company.companyEmail"),
    }),
  }),
  tax: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("company.tax"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.tax"),
        num: standardMaxLength,
      }),
    }),
  userId: z.coerce.number(),
});

export default companyInfoSchema;
