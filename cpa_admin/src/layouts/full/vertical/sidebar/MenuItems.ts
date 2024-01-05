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

import { IconBasket, IconCategory, IconCoin } from "@tabler/icons-react";

const Menuitems = () =>
  [
    {
      navlabel: true,
      subheader: "Pocetna",
    },
    {
      id: uniqueId(),
      title: "Kategorije",
      icon: IconCategory,
      href: "/",
    },
    {
      id: uniqueId(),
      title: "Proizvodi",
      icon: IconBasket,
      href: "/products",
    },
    {
      id: uniqueId(),
      title: "Plaćanja",
      icon: IconCoin,
      href: "/payments",
    },
  ] as MenuitemsType[];

export default Menuitems;
