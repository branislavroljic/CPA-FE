import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { Chip } from "@mui/material";
import { Domain } from "@api/user/user";

const defaultColumns = (
  t: TFunction<"translation", undefined, "translation">
) =>
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "domain",
      header: t("domain.domain"),
    },
    {
      accessorKey: "type",
      header: t("domain.type"),
    },
    {
      accessorKey: "status",
      header: t("domain.status"),
      Cell: ({ renderedCellValue, row }) => (
        <Chip
          label={renderedCellValue}
          color={row.original.status === "ACTIVE" ? "success" : "error"}
        />
      ),
    },
  ] as MRT_ColumnDef<Domain>[];

export default defaultColumns;
