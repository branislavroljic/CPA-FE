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
      header: "Korisničko ime",
    },
    {
      accessorKey: "email",
      header: "Email",
      enableColumnFilter: false,
    },
    {
      accessorKey: "country",
      header: "Država",
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
      accessorKey: "balance",
      header: "Stanje",
      enableColumnFilter: false,
    },
    {
      accessorKey: "status",
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
      header: "Omogućeni VIP proizvodi",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
      Cell: ({ row }) =>
        row.original.enabledVipProducts ? (
          <VerifiedIcon color="warning" />
        ) : (
          <VerifiedIcon color="disabled" />
        ),
      enableColumnFilter: false,
    },
  ] as MRT_ColumnDef<User>[];

export default defaultColumns;
