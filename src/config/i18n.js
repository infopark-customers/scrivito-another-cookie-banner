import I18n from "i18next";

import de from "./locales/cookieBanner/de.json";
import en from "./locales/cookieBanner/en.json";

const resources = {
  de: {
    cookieBanner: de,
  },
  en: {
    cookieBanner: en,
  },
};

I18n.init({
  lng: "de",
  fallbackLng: "de",
  resources,
  debug: false,
  ns: ["cookieBanner"],
  defaultNS: "cookieBanner",
  interpolation: {
    escapeValue: false, 
  },
});

export default I18n;
