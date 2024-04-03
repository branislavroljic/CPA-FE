import { MRT_ColumnDef } from "material-react-table";
import { Box, Chip } from "@mui/material";
import { SelectInput } from "@api/utils";
import { User } from "@api/user/user";
import { CircleFlag } from "react-circle-flags";
import VerifiedIcon from "@mui/icons-material/VerifiedTwoTone";

const defaultColumns = (accountStatuses: SelectInput[]) =>
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
      enableColumnFilter: false,
    },
    {
      accessorKey: "country",
      header: "Country",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <CircleFlag
            countryCode={row.original.country.toLowerCase()}
            height="25"
          />
          <span>{renderedCellValue}</span>
        </Box>
      ),
      enableColumnFilter: false,
    },
    {
      id: "balance",
      accessorFn: (row) => `$${row.balance}`,
      header: "Balance",
      enableColumnFilter: false,
    },
    {
      id: "paid",
      accessorFn: (row) => `$${row.paid}`,
      header: "Paid",
      enableColumnFilter: false,
    },
    {
      id : "status",
      accessorFn: (row) => row.status.replace(/_/g, " "),
      header: "Status",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
      Cell: ({ renderedCellValue, row }) =>
        row.original.status === "APPROVED" ? (
          <Chip label={renderedCellValue} color="success" />
        ) : row.original.status === "BLOCKED" ? (
          <Chip label={renderedCellValue} color="error" />
        ) : (
          <Chip label={renderedCellValue} color="warning" />
        ),
      filterVariant: "select",
      filterSelectOptions: accountStatuses,
    },
    {
      accessorKey: "enabledVipProducts",
      header: "VIP products enabled",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
      Cell: ({ row }) =>
        row.original.enabledVipProducts == "ENABLED" ? (
          <VerifiedIcon color="warning" />
        ) : (
          <VerifiedIcon color="disabled" />
        ),
      enableColumnFilter: false,
    },
  ] as MRT_ColumnDef<User>[];

export default defaultColumns;
