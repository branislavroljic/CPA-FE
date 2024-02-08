import { MRT_ColumnDef } from "material-react-table";
import { Referral } from "@api/referral/referral";

const defaultColumns = () =>
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "referralUserId",
      header: "Referral ID",
    },
    {
      accessorKey: "referralUserUsername",
      header: "Referral username",
    },
    {
      accessorKey: "newUserId",
      header: "New user ID",
    },
    {
      accessorKey: "newUserUsername",
      header: "New user username",
    },
    {
      accessorKey: "registrationDate",
      header: "Registration date",
    },
  ] as MRT_ColumnDef<Referral>[];

export default defaultColumns;
