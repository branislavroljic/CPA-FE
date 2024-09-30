import { MRT_ColumnDef } from "material-react-table";
import { AnalyticsPerDate } from "@api/analytics/analytics";
const defaultColumns = () =>
  [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "hold",
      header: "Hold",
    },
    {
      accessorKey: "conversions",
      header: "Conversions",
    },
    {
      accessorKey: "conversionRate",
      header: "Conversion rate",
    },
    {
      accessorKey: "trash",
      header: "Trash",
    },
    {
      accessorKey: "cancelled",
      header: "Cancelled",
    },
  ] as MRT_ColumnDef<AnalyticsPerDate>[];

export default defaultColumns;
