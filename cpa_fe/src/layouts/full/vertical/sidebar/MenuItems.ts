import { uniqueId } from 'lodash';

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
import i18n from '../../../../i18n';

import {
  IconBell,
  IconBrandCashapp,
  IconBug,
  IconBuildingCommunity,
  IconBuildingStore,
  IconChartHistogram,
  IconHelpOctagon,
  IconMapPin,
  IconShoppingCartDiscount,
  IconUsersGroup,
} from '@tabler/icons-react';
import { TFunction } from 'i18next';

const Menuitems = (t: TFunction<'translation', undefined, 'translation'>) =>
  [
    {
      navlabel: true,
      subheader: i18n.t('util.home').toUpperCase(),
    },

    // {
    //   id: uniqueId(),
    //   title: i18n.t('company.page'),
    //   icon: ApartmentIcon,
    //   href: '/companies',
    // },
    // {
    //   id: uniqueId(),
    //   title: i18n.t('companyType.name'),
    //   icon: BusinessIcon,
    //   href: '/companyTypes',
    // },
    {
      id: uniqueId(),
      title: i18n.t('company.page'),
      icon: IconBuildingStore,
      href: '/',
    },
    {
      id: uniqueId(),
      title: i18n.t('companyType.name'),
      icon: IconBuildingCommunity,
      href: '/companyTypes',
    },
    {
      navlabel: true,
      subheader: t('util.info').toUpperCase(),
    },
    {
      id: uniqueId(),
      title: 'Prijava grešaka',
      icon: IconBug,
      href: '/issue-tickets',
    },
  ] as MenuitemsType[];

export default Menuitems;
