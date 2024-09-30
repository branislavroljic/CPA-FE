import { MRT_ColumnDef } from "material-react-table";
import { CustomPayout } from "@api/custom-payout/custom-payout";

const defaultColumns = () =>
  [
    {
      accessorKey: "payout",
      header: "Payout",
    },
    {
      accessorKey: "userId",
      header: "User ID",
    },
    {
      accessorKey: "productId",
      header: "Offer ID",
    },
  ] as MRT_ColumnDef<CustomPayout>[];

export default defaultColumns;
