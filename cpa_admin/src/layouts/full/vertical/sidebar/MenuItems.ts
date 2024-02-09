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
  IconShoppingCart,
  IconUsersGroup,
} from "@tabler/icons-react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { ConnectWithoutContactOutlined } from "@mui/icons-material";

const Menuitems = () =>
  [
    {
      navlabel: true,
      subheader: "Pocetna",
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
  ] as MenuitemsType[];

export default Menuitems;
