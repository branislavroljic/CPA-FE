import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { PostbackHistory } from "@api/user/user";
import { Chip, Tooltip, Typography } from "@mui/material";

const defaultColumns = (
  t: TFunction<"translation", undefined, "translation">
) =>
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "productId",
      header: t("postback.product"),
    },
    {
      accessorKey: "requestUrl",
      header: t("postback.requestUrl"),
      Cell: ({ row }) => (
        <Tooltip
          title={row.original.requestUrl}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="body1">{row.original.requestUrl}</Typography>
        </Tooltip>
      ),
    },
    {
      accessorKey: "status",
      header: t("postback.status"),
      Cell: ({ renderedCellValue, row }) =>
        row.original.status === "ACTIVE" ? (
          <Chip label={renderedCellValue} color="success" />
        ) : (
          <Chip label={renderedCellValue} color="error" />
        ),
    },
    {
      accessorKey: "time",
      header: t("postback.timestamp"),
    },
  ] as MRT_ColumnDef<PostbackHistory>[];

export default defaultColumns;
