import { uniqueId } from "lodash";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

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
  IconChartAreaLine,
  IconCoin,
  IconCoins,
  IconHistoryToggle,
  IconLink,
  IconScale,
  IconShoppingCart,
} from "@tabler/icons-react";
import { TFunction } from "i18next";
import { ConnectWithoutContactOutlined } from "@mui/icons-material";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import InsightsIcon from "@mui/icons-material/Insights";

const Menuitems = (t: TFunction<"translation", "translation">) =>
  [
    {
      navlabel: true,
      subheader: i18n.t("util.home").toUpperCase(),
    },
    {
      id: uniqueId(),
      title: i18n.t("statistics.title"),
      icon: DashboardCustomizeOutlinedIcon,
      href: "/",
    },
    {
      id: uniqueId(),
      title: t("reports.title"),
      icon: QueryStatsIcon,
      href: "/reports",
    },
    {
      id: uniqueId(),
      title: i18n.t("products.title"),
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
      title: "Referral",
      icon: ConnectWithoutContactOutlined,
      href: "/referrals",
    },

    // {
    //   id: uniqueId(),
    //   title: "Postback",
    //   icon: IconChartAreaLine,
    //   href: "/postback/",
    //   children: [
    //     {
    //       id: uniqueId(),
    //       title: t("postback.title"),
    //       icon: IconPoint,
    //       href: "/postback/rule",
    //     },
    //     {
    //       id: uniqueId(),
    //       title: t("postback.history"),
    //       icon: IconPoint,
    //       href: "/postback/history",
    //     },
    //   ],
    // },

    {
      id: uniqueId(),
      title: "Postback",
      icon: IconChartAreaLine,
      href: "/postback/rule",
    },
    {
      id: uniqueId(),
      title: t("postback.history"),
      icon: InsightsIcon,
      href: "/postback/history",
    },

    {
      id: uniqueId(),
      title: t("order.title"),
      icon: IconShoppingCart,
      href: "/orders",
    },

    {
      id: uniqueId(),
      title: i18n.t("domain.title"),
      icon: IconLink,
      href: "/domains",
    },

    {
      id: uniqueId(),
      title: t("order.balanceTitle"),
      icon: IconScale,
      href: "/balance",
    },
    {
      id: uniqueId(),
      title: i18n.t("loginHistory.title"),
      icon: IconHistoryToggle,
      href: "/login-history",
    },

    // {
    //   navlabel: true,
    //   subheader: t("util.info").toUpperCase(),
    // },
    // {
    //   id: uniqueId(),
    //   title: "Prijava grešaka",
    //   icon: IconBug,
    //   href: "/issue-tickets",
    // },
  ] as MenuitemsType[];

export default Menuitems;
