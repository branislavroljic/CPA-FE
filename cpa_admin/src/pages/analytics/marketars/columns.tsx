import { MRT_ColumnDef } from "material-react-table";
import { Marketar } from "@api/analytics/analytics";

const defaultColumns = () =>
  [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "externalMarketarId",
      header: "External marketar ID",
    },
  ] as MRT_ColumnDef<Marketar>[];

export default defaultColumns;
