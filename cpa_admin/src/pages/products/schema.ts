import { z } from "zod";
import i18n from "../../i18n";

const longerMaxLength = import.meta.env.VITE_LONGER_FILED_MAX_LENGHT;
const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE;
const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const specialOfferSchema = z.object({
  image: z
    .custom<File>()
    .refine(
      (file) => file.size < maxFileSize,
      i18n.t("util.maxFileSize", { num: 5 })
    )
    .refine(
      (file) => acceptedImageTypes.includes(file.type),
      "Dozvoljeni tipovi fajlova"
    )
    .optional(),
  body: z.object({
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
    description: z
      .string({
        required_error: i18n.t("util.required.male", {
          field: "Opis",
        }),
      })
      .max(longerMaxLength, {
        message: i18n.t("util.maxLength", {
          field: "Opis",
          num: longerMaxLength,
        }),
      }),
    descriptionEng: z
      .string({
        required_error: i18n.t("util.required.male", {
          field: "Opis na engleskom",
        }),
      })
      .max(longerMaxLength, {
        message: i18n.t("util.maxLength", {
          field: "Opis na engleskom",
          num: longerMaxLength,
        }),
      }),
    price: z.coerce
      .number({
        invalid_type_error: i18n.t("util.number", {
          field: "Cijena",
        }),
        required_error: i18n.t("util.required.female", {
          field: "Cijena",
        }),
      })
      .min(0, {
        message: i18n.t("util.min", {
          field: "Cijena",
          num: 0,
        }),
      }),
    currency: z
      .string({
        required_error: i18n.t("util.required.female", {
          field: "Valuta",
        }),
      })
      .max(longerMaxLength, {
        message: i18n.t("util.maxLength", {
          field: "Valuta",
          num: longerMaxLength,
        }),
      }),
    payout: z.coerce
      .number({
        invalid_type_error: i18n.t("util.number", {
          field: "Isplata",
        }),
        required_error: i18n.t("util.required.female", {
          field: "Isplata",
        }),
      })
      .min(0, {
        message: i18n.t("util.min", {
          field: "Isplata",
          num: 0,
        }),
      }),
    type: z.string({
      required_error: i18n.t("util.required.male", {
        field: "Tip",
      }),
    }),
    limit_per_day: z.number({
      required_error: i18n.t("util.required.male", {
        field: "Dnevni limit",
      }),
    }),
    country_code: z.string({
      required_error: i18n.t("util.required.male", {
        field: "Kod države",
      }),
    }),
    categoriesIDs: z.array(
      z.number({
        required_error: i18n.t("util.required.male", {
          field: "Tip",
        }),
      })
    ),
    landingPagesString: z.string().optional(),
    prelandingPagesString: z.string().optional(),
  }),
});

export default specialOfferSchema;
