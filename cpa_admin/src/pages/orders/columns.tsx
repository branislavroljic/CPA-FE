import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { Chip } from "@mui/material";
import { Order } from "@api/order/order";
import { SelectInput } from "@api/utils";

const defaultColumns = (
  orderStatuses: SelectInput[],
  t: TFunction<"translation", "translation">
) =>
  [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnFilter: false,
    },
    {
      accessorKey: "name",
      header: t("user.firstname"),
      enableColumnFilter: false,
    },
    {
      accessorKey: "phoneNumber",
      header: t("user.phoneNumber"),
      enableColumnFilter: false,
    },
    {
      accessorKey: "productName",
      header: t("order.productName"),
      enableColumnFilter: false,
    },
    {
      accessorKey: "quantity",
      header: t("order.quantity"),
      enableColumnFilter: false,
    },
    {
      accessorKey: "totalPrice",
      header: t("order.totalPrice"),
      enableColumnFilter: false,
    },
    {
      accessorFn: (row) => new Date(row.time), //convert to date for sorting and filtering
      id: "dateTime",
      header: t("order.dateTime"),
      Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), // convert back to string for display
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
        row.original.status === "DONE" ? (
          <Chip label={renderedCellValue} color="success" />
        ) : row.original.status === "CANCELLED" ? (
          <Chip label={renderedCellValue} color="error" />
        ) : (
          <Chip label={renderedCellValue} color="warning" />
        ),
      filterVariant: "select",
      filterSelectOptions: orderStatuses,
    },
  ] as MRT_ColumnDef<Order>[];

export default defaultColumns;
