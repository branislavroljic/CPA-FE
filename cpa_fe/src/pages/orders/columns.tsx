import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { Order } from "@api/user/user";
import { Box, Chip } from "@mui/material";
import { CircleFlag } from "react-circle-flags";

const defaultColumns = (t: TFunction<"translation", "translation">) =>
  [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "productName",
      header: t("order.productName"),
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
      accessorKey: "prelandingPage",
      header: t("order.prelandingPage"),
    },
    {
      accessorKey: "landingPage",
      header: t("order.landingPage"),
    },
    {
      accessorKey: "country",
      header: t("loginHistory.country"),
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <CircleFlag
            countryCode={row.original.country?.toLowerCase()}
            height="25"
          />
          {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}

          <span>{renderedCellValue}</span>
        </Box>
      ),
    },

    {
      accessorKey: "quantity",
      header: t("order.quantity"),
    },

    {
      accessorFn: (row) => new Date(row.time), //convert to date for sorting and filtering
      id: "dateTime",
      header: t("order.dateTime"),
      Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), // convert back to string for display
    },

    {
      accessorFn: (row) => `${row.totalPrice} $`,
      header: t("order.totalPrice"),
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
        ) : row.original.status === "CANCELLED" ||
          row.original.status === "TRASH" ? (
          <Chip label={renderedCellValue} color="error" />
        ) : (
          <Chip label={renderedCellValue} color="warning" />
        ),
    },

    {
      accessorKey: "baseUrl",
      header: t("order.baseUrl"),
    },
    {
      accessorKey: "referrer",
      header: "Referrer",
    },
    {
      accessorKey: "ip",
      header: "IP",
    },
    {
      accessorKey: "operatingSystem",
      header: t("loginHistory.operatingSystem"),
    },
    {
      accessorKey: "browser",
      header: t("loginHistory.browser"),
    },
    {
      accessorKey: "device",
      header: t("loginHistory.device"),
    },
    {
      accessorKey: "sub1",
      header: "sub1",
    },
    {
      accessorKey: "sub2",
      header: "sub2",
    },
    {
      accessorKey: "sub3",
      header: "sub3",
    },
    {
      accessorKey: "sub4",
      header: "sub4",
    },
  ] as MRT_ColumnDef<Order>[];

export default defaultColumns;
