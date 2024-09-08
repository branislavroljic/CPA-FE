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
      header: "First name",
      enableColumnFilter: false,
    },
    {
      accessorKey: "userUsername",
      header: "Username",
      enableColumnFilter: false,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone number",
      enableColumnFilter: false,
    },
    {
      accessorKey: "productName",
      header: "Offer name",
      enableColumnFilter: false,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      enableColumnFilter: false,
    },
    {
      accessorFn: (row) => `${row.totalPrice} ${row.productCurrency}`,
      header: "Total price",
    },
    {
      accessorKey: "time",
      header: "Date and time",
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
        ) : row.original.status === "CANCELLED" ||
          row.original.status === "TRASH" ? (
          <Chip label={renderedCellValue} color="error" />
        ) : (
          <Chip label={renderedCellValue} color="warning" />
        ),
      filterVariant: "select",
      filterSelectOptions: orderStatuses,
    },
    {
      accessorKey: "userIP",
      header: "IP",
    },
    {
      accessorKey: "baseURL",
      header: "Base URL",
    },
    {
      accessorKey: "referrer",
      header: "Referrer",
    },
    {
      accessorKey: "sub_1",
      header: "sub1",
    },
    {
      accessorKey: "sub_2",
      header: "sub2",
    },
    {
      accessorKey: "sub_3",
      header: "sub3",
    },
    {
      accessorKey: "sub_4",
      header: "sub4",
    },
    {
      accessorKey: "operatingSystem",
      header: "Operating system",
    },
    {
      accessorKey: "browserName",
      header: "Browser",
    },
    {
      accessorKey: "browserVersion",
      header: "Browser version",
    },
    {
      accessorKey: "deviceType",
      header: "Device",
    },
  ] as MRT_ColumnDef<Order>[];

export default defaultColumns;
