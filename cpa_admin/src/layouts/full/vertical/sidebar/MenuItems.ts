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

import {
  IconBasket,
  IconCategory,
  IconCoin,
  IconHeartHandshake,
  IconShoppingCart,
  IconUsersGroup,
  IconVip,
} from "@tabler/icons-react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import {
  Analytics,
  AnalyticsOutlined,
  ConnectWithoutContactOutlined,
  Wallet,
} from "@mui/icons-material";

const Menuitems = () =>
  [
    {
      navlabel: true,
      subheader: "HOME",
    },
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: DashboardCustomizeOutlinedIcon,
      href: "/",
    },
    {
      id: uniqueId(),
      title: "Categories",
      icon: IconCategory,
      href: "/categories",
    },
    {
      id: uniqueId(),
      title: "Offers",
      icon: IconBasket,
      href: "/products",
    },
    {
      id: uniqueId(),
      title: "Orders",
      icon: IconShoppingCart,
      href: "/orders",
    },
    {
      id: uniqueId(),
      title: "Partners",
      icon: IconHeartHandshake,
      href: "/partners",
    },
    {
      id: uniqueId(),
      title: "Payments",
      icon: IconCoin,
      href: "/payments",
    },
    {
      id: uniqueId(),
      title: "Users",
      icon: IconUsersGroup,
      href: "/users",
    },
    {
      id: uniqueId(),
      title: "Statistics",
      icon: QueryStatsIcon,
      href: "/reports",
    },
    {
      id: uniqueId(),
      title: "Referral",
      icon: ConnectWithoutContactOutlined,
      href: "/referrals",
    },
    {
      id: uniqueId(),
      title: "VIP requests",
      icon: IconVip,
      href: "/vip_requests",
    },
    {
      id: uniqueId(),
      title: "Analytics",
      icon: AnalyticsOutlined,
      href: "/analytics",
    },
    {
      id: uniqueId(),
      title: "Custom payout",
      icon: Wallet,
      href: "/custom_payouts",
    },
  ] as MenuitemsType[];

export default Menuitems;
