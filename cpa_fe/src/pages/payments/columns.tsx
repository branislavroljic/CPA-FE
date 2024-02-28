import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { Chip } from "@mui/material";
import { Payment } from "@api/user/user";

const defaultColumns = (t: TFunction<"translation", "translation">) =>
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      id: "amount",
      accessorFn: (row) => `$ ${row.amount}`,
      header: t("payments.amount"),
    },
    {
      id: "balanceBeforeRequest",
      accessorFn: (row) => `$ ${row.balanceBeforeRequest}`,
      header: t("payments.balanceBeforeRequest"),
    },
    {
      accessorKey: "method",
      header: t("payments.method"),
    },
    {
      accessorKey: "status",
      header: t("payments.status"),
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
    },
    {
      accessorKey: "description",
      header: t("payments.description"),
    },
    {
      accessorKey: "createdAt",
      header: t("payments.createdAt"),
    },
    {
      accessorKey: "editedAt",
      header: t("payments.editedAt"),
    },
    {
      accessorKey: "userUsername",
      header: t("loginHistory.username"),
    },
  ] as MRT_ColumnDef<Payment>[];

export default defaultColumns;
