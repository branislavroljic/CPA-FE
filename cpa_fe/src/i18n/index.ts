import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import enResources from "./en";
import bsResources from './bs';
import enResources from './en';

export const resources = {
  en: enResources,
  bs: bsResources,
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'bs',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
