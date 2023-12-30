import { z } from "zod";
import i18n from "../../i18n";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;
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
      i18n.t("specialOffer.allowedFileTypes")
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
    startDateTime: z.coerce.date({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("specialOffer.startDateTime"),
      }),
    }),
    endDateTime: z.coerce.date({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("specialOffer.endDateTime"),
      }),
    }),
  }),
});

export default specialOfferSchema;
