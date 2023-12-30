import i18n from "../i18n";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessIcon from "@mui/icons-material/Business";

const navigation = [
  {
    name: i18n.t("loginHistory.title"),
    icon: ApartmentIcon,
    href: "/login_history",
  },
  {
    name: i18n.t("payments.title"),
    icon: BusinessIcon,
    href: "/payments",
  },
  {
    name: i18n.t("domains.title"),
    icon: BusinessIcon,
    href: "/domains",
  },
];

export default navigation;
