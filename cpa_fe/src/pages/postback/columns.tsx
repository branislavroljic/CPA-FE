import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { Postback } from "@api/user/user";
import { Chip, Tooltip, Typography } from "@mui/material";

const defaultColumns = (
  t: TFunction<"translation", "translation">
) =>
  [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "name",
      header: t("postback.name"),
    },
    {
      accessorKey: "finalUrl",
      header: t("postback.url"),
      Cell: ({ row }) => (
        <Tooltip
          title={row.original.finalUrl}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="body1">{row.original.finalUrl}</Typography>
        </Tooltip>
      ),
    },
    {
      accessorKey: "level",
      header: t("postback.level"),
      Cell: ({ renderedCellValue, row }) =>
        row.original.level === "GLOBAL" ? (
          <Chip label={renderedCellValue} color="primary" />
        ) : (
          <Chip label={renderedCellValue} color="secondary" />
        ),
    },
    {
      accessorKey: "method",
      header: t("postback.method"),
      Cell: ({ renderedCellValue }) => (
        <Chip label={renderedCellValue} color="default" />
      ),
    },
    {
      accessorKey: "event",
      header: t("postback.event"),
      Cell: ({ renderedCellValue, row }) =>
        row.original.event === "HOLD" ? (
          <Chip label={renderedCellValue} color="warning" />
        ) : row.original.event === "TRASH" ? (
          <Chip label={renderedCellValue} color="error" />
        ) : row.original.event === "CANCELLED" ? (
          <Chip label={renderedCellValue} color="error" />
        ) : (
          <Chip label={renderedCellValue} color="success" />
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
      accessorKey: "productName",
      header: t("postback.productName"),
    },
  ] as MRT_ColumnDef<Postback>[];

export default defaultColumns;
