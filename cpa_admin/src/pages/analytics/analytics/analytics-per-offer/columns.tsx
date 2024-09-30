import { MRT_ColumnDef } from "material-react-table";
import { AnalyticsPerOffer } from "@api/analytics/analytics";
const defaultColumns = () =>
  [
    {
      accessorKey: "productId",
      header: "Offer Id",
    },
    {
      accessorKey: "productName",
      header: "Offer name",
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
  ] as MRT_ColumnDef<AnalyticsPerOffer>[];

export default defaultColumns;
