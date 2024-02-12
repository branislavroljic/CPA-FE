import { MRT_ColumnDef } from "material-react-table";
import { Chip } from "@mui/material";
import { Payment } from "@api/payment/payment";
import { SelectInput } from "@api/utils";

const defaultColumns = (paymentStatuses: SelectInput[]) =>
  [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnFilter: false,
    },
    {
      accessorKey: "userId",
      header: "User ID",
    },
    {
      accessorKey: "userUsername",
      header: "Username",
      enableColumnFilter: false,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      enableColumnFilter: false,
    },
    {
      accessorKey: "balanceBeforeRequest",
      header: "Balance before request",
      enableColumnFilter: false,
    },
    {
      accessorKey: "method",
      header: "Method",
      enableColumnFilter: false,
    },
    {
      accessorKey: "info",
      header: "Info",
      enableColumnFilter: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ renderedCellValue, row }) => (
        <Chip
          label={renderedCellValue}
          color={
            row.original.status === "APPROVED"
              ? "success"
              : row.original.status === "REQUESTED"
              ? "warning"
              : "error"
          }
        />
      ),
      filterVariant: "select",
      filterSelectOptions: paymentStatuses,
    },
    {
      accessorKey: "description",
      header: "Description",
      enableColumnFilter: false,
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      enableColumnFilter: false,
    },
    {
      accessorKey: "editedAt",
      header: "Edited at",
      enableColumnFilter: false,
    },
  ] as MRT_ColumnDef<Payment>[];

export default defaultColumns;
