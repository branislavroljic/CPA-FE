import { MRT_ColumnDef } from "material-react-table";
import { TFunction } from "i18next";
import { BalanceOrder } from "@api/user/user";

const defaultColumns = (t: TFunction<"translation", "translation">) =>
  [
    {
      accessorKey: "orderId",
      header: t("order.orderId"),
    },
    {
      accessorKey: "offerName",
      header: t("order.offerName"),
    },
    {
      accessorKey: "payout",
      header: t("order.payout"),
    },
  ] as MRT_ColumnDef<BalanceOrder>[];

export default defaultColumns;
