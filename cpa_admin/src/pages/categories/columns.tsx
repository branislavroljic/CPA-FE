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
      header: "Name",
    },
    {
      accessorKey: "nameEng",
      header: "Name in english",
    },
    {
      accessorKey: "color",
      header: "Color",
    },
  ] as MRT_ColumnDef<Category>[];

export default defaultColumns;
