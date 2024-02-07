import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { LoginHistory } from "@api/user/user";
import { CircleFlag } from "react-circle-flags";
import { Box, Chip } from "@mui/material";

const defaultColumns = (t: TFunction<"translation", "translation">) =>
  [
    {
      accessorKey: "ip",
      header: "IP",
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
      accessorKey: "status",
      header: t("loginHistory.status"),
      Cell: ({ renderedCellValue, row }) =>
        row.original.status === "SUCCESS" ? (
          <Chip label={renderedCellValue} color="success" />
        ) : (
          <Chip label={renderedCellValue} color="error" />
        ),
    },
    {
      accessorKey: "device",
      header: t("loginHistory.device"),
    },
    {
      accessorKey: "browser",
      header: t("loginHistory.browser"),
    },
    {
      accessorKey: "browserVersion",
      header: t("loginHistory.browserVersion"),
    },
    {
      accessorKey: "operatingSystem",
      header: t("loginHistory.operatingSystem"),
    },
    {
      accessorKey: "createdTime",
      header: t("loginHistory.createdTime"),
    },
    // {
    //   accessorKey: "userUsername",
    //   header: t("loginHistory.username"),
    // },
  ] as MRT_ColumnDef<LoginHistory>[];

export default defaultColumns;
