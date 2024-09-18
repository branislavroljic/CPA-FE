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
      accessorFn: (row) => row.time, //convert to date for sorting and filtering
      id: "dateTime",
      header: t("order.dateTime"),
      // Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), // convert back to string for display
    },

    {
      accessorFn: (row) => `${row.totalPrice.toFixed(2)} ${row.productCurrency}`,
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
        row.original.status === "APPROVED" ? (
          <Chip label={renderedCellValue} color="success" />
        ) : row.original.status === "CANCELLED" ||
          row.original.status === "TRASH" ? (
          <Chip label={renderedCellValue} color="error" />
        ) : (
          <Chip label={renderedCellValue} color="warning" />
        ),
    },
    {
      accessorKey: "userIP",
      header: "IP",
    },
    {
      accessorKey: "baseURL",
      header: t("order.baseUrl"),
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
      header: t("loginHistory.operatingSystem"),
    },
    {
      accessorKey: "browserName",
      header: t("loginHistory.browser"),
    },
    {
      accessorKey: "browserVersion",
      header: t("loginHistory.browserVersion"),
    },
    {
      accessorKey: "deviceType",
      header: t("loginHistory.device"),
    },
  ] as MRT_ColumnDef<Order>[];

export default defaultColumns;
