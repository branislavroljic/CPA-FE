import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { StatisticsReport } from "@api/user/user";
const defaultColumns = (
  t: TFunction<"translation", undefined, "translation">
) =>
  [
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
    {
      accessorKey: "totalHoldRevenue",
      header: t("reports.totalHoldRevenue"),
    },
    {
      accessorKey: "holdRevenue",
      header: t("reports.holdRevenue"),
    },
    {
      accessorKey: "revenue",
      header: t("reports.revenue"),
    },
    {
      accessorKey: "totalTrashRevenue",
      header: t("reports.totalTrashRevenue"),
    },
    {
      accessorKey: "totalCancelledRevenue",
      header: t("reports.totalCancelledRevenue"),
    },
  ] as MRT_ColumnDef<StatisticsReport>[];

export default defaultColumns;
