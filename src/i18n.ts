import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from "i18next-xhr-backend";

import translationEnUS from "./locales/en-US/translation.json";
import translationJaJP from "./locales/ja-JP/translation.json";
import translationKoKR from "./locales/ko-KR/translation.json";
import translationZhCN from "./locales/zh-CN/translation.json";
import translationZhTW from "./locales/zh-TW/translation.json";

const DETECTION_OPTIONS = {
  order: ['querystring'],
  lookupQuerystring: 'lng'
};

i18n
.use(initReactI18next)
.use(XHR)
.use(LanguageDetector)
.init({
  resources: {
    'en-US': {
      translations: translationEnUS
    },
    'ja-JP': {
      translations: translationJaJP
    },
    'ko-KR': {
      translations: translationKoKR
    },
    'zh-CN': {
      translations: translationZhCN
    },
    'zh-TW': {
      translations: translationZhTW
    }
  },
  detection: DETECTION_OPTIONS,
  fallbackLng: "en-US",
  debug: true,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false, // we use content as keys
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },
  react: {
    wait: true
  }
});

export default i18n;