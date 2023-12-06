import { z } from "zod";
import i18n from "../../../i18n";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const basicInfoSchema = z.object({
  name: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("user.firstname"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("user.firstname"),
        num: 3,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("user.firstname"),
        num: standardMaxLength,
      }),
    }),
  surname: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("user.lastname"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("user.lastname"),
        num: 3,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("user.lastname"),
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
});

export default basicInfoSchema;
