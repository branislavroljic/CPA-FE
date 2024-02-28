import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { Report } from "@api/user/user";
const defaultColumns = (t: TFunction<"translation", "translation">) =>
  [
    {
      accessorKey: "productId",
      header: t("products.id"),
    },
    {
      accessorKey: "productName",
      header: t("products.name"),
    },
    {
      accessorKey: "total",
      header: t("reports.total"),
    },
    {
      accessorKey: "hold",
      header: t("reports.hold"),
    },
    {
      accessorKey: "conversions",
      header: t("reports.conversions"),
    },
    {
      accessorKey: "conversionRate",
      header: t("reports.conversionRate"),
    },
    {
      accessorKey: "trash",
      header: t("reports.trash"),
    },
    {
      accessorKey: "cancelled",
      header: t("reports.cancelled"),
    },
    // {
    //   accessorKey: "totalHoldRevenue",
    //   header: t("reports.totalHoldRevenue"),
    // },
    {
      id: "holdRevenue",
      accessorFn: (row) => `$ ${row.holdRevenue}`,
      header: t("reports.holdRevenue"),
    },
    {
      id: "revenue",
      accessorFn: (row) => `$ ${row.revenue}`,
      header: t("reports.revenue"),
    },
    // {
    //   accessorKey: "totalTrashRevenue",
    //   header: t("reports.totalTrashRevenue"),
    // },
    // {
    //   accessorKey: "totalCancelledRevenue",
    //   header: t("reports.totalCancelledRevenue"),
    // },
  ] as MRT_ColumnDef<Report>[];

export default defaultColumns;
