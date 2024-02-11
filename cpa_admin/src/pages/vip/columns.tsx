import { MRT_ColumnDef } from "material-react-table";
import VerifiedIcon from "@mui/icons-material/VerifiedTwoTone";
import { VIPRequest } from "@api/vip/vip";
import { BlockRounded } from "@mui/icons-material";
const defaultColumns = () =>
  [
    {
      accessorKey: "userId",
      header: "User ID",
    },
    {
      accessorKey: "userUsername",
      header: "Username",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "done",
      header: "Done",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
      Cell: ({ row }) =>
        row.original.done ? (
          <VerifiedIcon color="success" />
        ) : (
          <BlockRounded color="error" />
        ),
      enableColumnFilter: false,
    },
  ] as MRT_ColumnDef<VIPRequest>[];

export default defaultColumns;
