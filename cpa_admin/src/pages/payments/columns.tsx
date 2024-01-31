import { MRT_ColumnDef } from "material-react-table";
import { Chip } from "@mui/material";
import { Payment } from "@api/payment/payment";
import { SelectInput } from "@api/utils";

const defaultColumns = (
  paymentStatuses : SelectInput[],
) =>
  [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnFilter: false,
    },
    {
      accessorKey: "userId",
      header: "Id korisnika",
    },
    {
      accessorKey: "userUsername",
      header: "Username",
      enableColumnFilter: false,
    },
    {
      accessorKey: "amount",
      header: "Iznos",
      enableColumnFilter: false,
    },
    {
      accessorKey: "balanceBeforeRequest",
      header: "Stanje prije zahtjeva",
      enableColumnFilter: false,
    },
    {
      accessorKey: "method",
      header: "Metod",
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
      filterVariant: 'select',
      filterSelectOptions: paymentStatuses,
    },
    {
      accessorKey: "description",
      header: "Opis",
      enableColumnFilter: false,
    },
    {
      accessorKey: "createdAt",
      header: "Kreirano",
      enableColumnFilter: false,
    },
    {
      accessorKey: "editedAt",
      header: "Editovano",
      enableColumnFilter: false,
    },
  ] as MRT_ColumnDef<Payment>[];

export default defaultColumns;
