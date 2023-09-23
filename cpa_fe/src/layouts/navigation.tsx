import i18n from '../i18n';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';

const navigation = [
  {
    name: i18n.t('company.page'),
    icon: ApartmentIcon,
    href: '/companies',
    // permission: PermissionNames.Read,
  },
  {
    name: i18n.t('companyType.name'),
    icon: BusinessIcon,
    href: '/companyTypes',
    // permission: PermissionNames.Read,
  },
  // {
  //   name: i18n.t('threat.page'),
  //   icon: FireIcon,
  //   href: '/threats',
  //   permission: PermissionNames.Read,
  // },
];

export default navigation;
