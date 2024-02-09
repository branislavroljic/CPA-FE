import { z } from "zod";
import i18n from "../../i18n";

const longerMaxLength = import.meta.env.VITE_LONGER_FILED_MAX_LENGHT;
const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE;
const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const productSchema = z.object({
  image: z
    .custom<File>()
    .refine(
      (file) => !file || file.size < maxFileSize,
      i18n.t("util.maxFileSize", { num: 5 })
    )
    .refine(
      (file) => !file || acceptedImageTypes.includes(file.type),
      "Allowed file types"
    )
    .optional(),
  body: z.object({
    id: z.coerce.number().optional(),
    name: z.string({
      required_error: i18n.t("util.required.male", {
        field: "Name",
      }),
    }),
    nameEng: z.string({
      required_error: i18n.t("util.required.male", {
        field: "Name in English",
      }),
    }),
    description: z
      .string({
        required_error: i18n.t("util.required.male", {
          field: "Description",
        }),
      })
      .max(longerMaxLength, {
        message: i18n.t("util.maxLength", {
          field: "Description",
          num: longerMaxLength,
        }),
      }),
    descriptionEng: z
      .string({
        required_error: i18n.t("util.required.male", {
          field: "Description in English",
        }),
      })
      .max(longerMaxLength, {
        message: i18n.t("util.maxLength", {
          field: "Description in English",
          num: longerMaxLength,
        }),
      }),
    status: z.string({
      required_error: i18n.t("util.required.male", {
        field: "Status",
      }),
    }),
    price: z.coerce
      .number({
        invalid_type_error: i18n.t("util.number", {
          field: "Price",
        }),
        required_error: i18n.t("util.required.female", {
          field: "Price",
        }),
      })
      .min(0, {
        message: i18n.t("util.min", {
          field: "Price",
          num: 0,
        }),
      }),
    currency: z
      .string({
        required_error: i18n.t("util.required.female", {
          field: "Currency",
        }),
      })
      .max(longerMaxLength, {
        message: i18n.t("util.maxLength", {
          field: "Currency",
          num: longerMaxLength,
        }),
      }),
    payout: z.coerce
      .number({
        invalid_type_error: i18n.t("util.number", {
          field: "Payout",
        }),
        required_error: i18n.t("util.required.female", {
          field: "Payout",
        }),
      })
      .min(0, {
        message: i18n.t("util.min", {
          field: "Payout",
          num: 0,
        }),
      }),
    type: z.string({
      required_error: i18n.t("util.required.male", {
        field: "Type",
      }),
    }),
    googleDriveLink: z.string().optional(),
    limit_per_day: z.coerce.number({
      required_error: i18n.t("util.required.male", {
        field: "Limit per day",
      }),
    }),
    country_code: z.string({
      required_error: i18n.t("util.required.male", {
        field: "Country code",
      }),
    }),
    categoriesIDs: z.array(
      z.coerce
        .number({
          required_error: i18n.t("util.required.male", {
            field: "Type",
          }),
        })
        .optional()
    ),
    landingPagesString: z.string().optional(),
    prelandingPagesString: z.string().optional(),
  }),
});

export default productSchema;
