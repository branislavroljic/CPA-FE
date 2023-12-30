import { MRT_ColumnDef } from "material-react-table";
import { Category } from "@api/category/category";

const defaultColumns = () =>
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Naziv",
    },
    {
      accessorKey: "nameEng",
      header: "Naziv na engleskom",
    },
    {
      accessorKey: "color",
      header: "Boja",
    },
  ] as MRT_ColumnDef<Category>[];

export default defaultColumns;
