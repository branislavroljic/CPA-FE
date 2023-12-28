import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { Order } from "@api/user/user";
import { Chip } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

const defaultColumns = (
  t: TFunction<"translation", undefined, "translation">
) =>
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: t("user.firstname"),
    },
    {
      accessorKey: "phoneNumber",
      header: t("user.phoneNumber"),
    },
    {
      accessorKey: "productName",
      header: t("order.productName"),
    },
    {
      accessorKey: "quantity",
      header: t("order.quantity"),
    },
    {
      accessorKey: "totalPrice",
      header: t("order.totalPrice"),
    },
    {
      accessorFn: (row) => new Date(row.time), //convert to date for sorting and filtering
      id: "dateTime",
      header: t("order.dateTime"),
      Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), // convert back to string for display
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
        row.original.status === "DONE" ? (
          <Chip label={renderedCellValue} color="success" />
        ) : row.original.status === "REJECTED" ? (
          <Chip label={renderedCellValue} color="error" />
        ) : (
          <Chip label={renderedCellValue} color="warning" />
        ),
    },
  ] as MRT_ColumnDef<Order>[];

export default defaultColumns;
