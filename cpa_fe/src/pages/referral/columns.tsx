import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { Referral } from "@api/user/user";
import { Chip } from "@mui/material";

const defaultColumns = (t: TFunction<"translation", "translation">) =>
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: t("user.username"),
    },
    {
      accessorKey: "name",
      header: t("user.firstname"),
    },
    {
      accessorKey: "surname",
      header: t("user.lastname"),
    },
    {
      accessorKey: "email",
      header: t("user.email"),
    },
    {
      accessorKey: "status",
      header: t("loginHistory.status"),
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
          <Chip label={"ON HOLD"} color="warning" />
        ),
    },
  ] as MRT_ColumnDef<Referral>[];

export default defaultColumns;
