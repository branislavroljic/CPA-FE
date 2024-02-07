import { z } from "zod";
import i18n from "../../../i18n";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const passwordSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: i18n.t("util.required.female", {
          field: i18n.t("user.currentPassword"),
        }),
      })
      .min(8, {
        message: i18n.t("util.length", {
          field: i18n.t("user.currentPassword"),
          num: 8,
        }),
      })
      .max(standardMaxLength, {
        message: i18n.t("util.maxLength", {
          field: i18n.t("user.currentPassword"),
          num: standardMaxLength,
        }),
      }),
    newPassword: z
      .string({
        required_error: i18n.t("util.required.female", {
          field: i18n.t("user.newPassword"),
        }),
      })
      .min(8, {
        message: i18n.t("util.length", {
          field: i18n.t("user.newPassword"),
          num: 8,
        }),
      })
      .max(standardMaxLength, {
        message: i18n.t("util.maxLength", {
          field: i18n.t("user.newPassword"),
          num: standardMaxLength,
        }),
      }),
    newPasswordConfirm: z
      .string({
        required_error: i18n.t("util.required.female", {
          field: i18n.t("user.confirmPassword"),
        }),
      })
      .min(8, {
        message: i18n.t("util.length", {
          field: i18n.t("user.confirmPassword"),
          num: 8,
        }),
      })
      .max(standardMaxLength, {
        message: i18n.t("util.maxLength", {
          field: i18n.t("user.confirmPassword"),
          num: standardMaxLength,
        }),
      }),
  })
  .partial()
  .superRefine((data, ctx) => {
    if (data.oldPassword === data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: i18n.t("user.sameAsOldPasswordError"),
      });
    } else if (data.newPasswordConfirm !== data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: i18n.t("user.passwordsDidNotMatchError"),
      });
    }
  });

export default passwordSchema;
