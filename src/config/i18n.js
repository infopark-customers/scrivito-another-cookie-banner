import I18n from "i18next";

import editingDE from "./locales/editing/de.json";
import editingEN from "./locales/editing/en.json";
import cookieBannerDE from "./locales/cookieBanner/de.json";
import cookieBannerEN from "./locales/cookieBanner/en.json";

const resources = {
  de: {
    editing: editingDE,
    cookieBanner: cookieBannerDE,
  },
  en: {
    editing: editingEN,
    cookieBanner: cookieBannerEN,
  },
};

I18n.init({
  lng: "de",
  fallbackLng: "de",
  resources,
  debug: false,

  // have a common namespace used around the full app
  ns: ["editing", "cookieBanner"],
  defaultNS: "cookieBanner",

  interpolation: {
    escapeValue: false, 
  },
});

export default I18n;
