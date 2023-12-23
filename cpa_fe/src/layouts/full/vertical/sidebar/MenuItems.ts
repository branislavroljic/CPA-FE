import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import i18n from "../../../../i18n";

import {
  IconBasket,
  IconBug,
  IconBuildingCommunity,
  IconBuildingStore,
  IconCoin,
  IconHistoryToggle,
  IconLink,
} from "@tabler/icons-react";
import { TFunction } from "i18next";
import {
  ConnectWithoutContact,
  ConnectWithoutContactOutlined,
} from "@mui/icons-material";

const Menuitems = (t: TFunction<"translation", undefined, "translation">) =>
  [
    {
      navlabel: true,
      subheader: i18n.t("util.home").toUpperCase(),
    },
    {
      id: uniqueId(),
      title: i18n.t("loginHistory.title"),
      icon: IconHistoryToggle,
      href: "/",
    },
    {
      id: uniqueId(),
      title: "Products",
      icon: IconBasket,
      href: "/products",
    },
    {
      id: uniqueId(),
      title: i18n.t("payments.title"),
      icon: IconCoin,
      href: "/payments",
    },
    {
      id: uniqueId(),
      title: i18n.t("domain.title"),
      icon: IconLink,
      href: "/domains",
    },
    {
      id: uniqueId(),
      title: "Referral",
      icon: ConnectWithoutContactOutlined,
      href: "/referrals",
    },
    {
      navlabel: true,
      subheader: t("util.info").toUpperCase(),
    },
    {
      id: uniqueId(),
      title: "Prijava grešaka",
      icon: IconBug,
      href: "/issue-tickets",
    },
  ] as MenuitemsType[];

export default Menuitems;
