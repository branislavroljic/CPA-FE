import { MRT_ColumnDef } from "material-react-table";
import { Report } from "@api/order/order";
const defaultColumns = () =>
  [
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
    {
      accessorKey: "holdRevenue",
      header: "Hold revenue",
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
    },
  ] as MRT_ColumnDef<Report>[];

export default defaultColumns;
