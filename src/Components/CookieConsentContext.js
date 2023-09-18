import * as React from "react";
import isEmpty from "lodash/isEmpty";

import defaultConfig from "../config/cookieConfiguration.json";
import I18n from "../config/i18n";
import logger from "../utils/logger";
import { getCookieValue, setCookieValue } from "../utils/cookie";
import { ACCEPTED, DECLINED } from "../utils/definitions";

const EXTENDED_MODE = "expanded";
const SIMPLE_MODE = "simple";

const CookieConsentContext = React.createContext({});

export function CookieConsentProvider({
  cookieConfig,
  logoUrl,
  children,
  language,
  translations,
}) {
  const cConfig = cookieConfig || defaultConfig;
  const consentCookieName = cConfig.name || defaultConfig.name;

  // https://traviswimer.com/blog/easily-fix-react-hydration-errors/
  const [hydrated, setHydrated] = React.useState(false);
  const [bannerVisibility, setBannerVisibility] = React.useState(false);
  const [cookieConsentChoice, setCookieConsentChoice] = React.useState({});
  const [bannerMode, setBannerMode] = React.useState(SIMPLE_MODE);

  if (language && I18n.resolvedLanguage !== language) {
    I18n.language = language;
  }

  if (translations) {
    Object.keys(translations).forEach((lang) => {
      I18n.addResourceBundle(
        lang,
        "cookieBanner",
        translations[lang],
        true,
        true
      );
    });
  }

  React.useEffect(() => {
    const value = getCookieValue(consentCookieName);

    logger.debug("[ScrivitoCookieBanner] initialize with:", value);
    setCookieConsentChoice(value);

    if (isEmpty(value)) {
      setBannerVisibility(true);
    }

    // This forces a rerender, so the children are rendered
    // the second time but not the first to match pre-rendered content.
    setHydrated(true);
  }, [consentCookieName]);

  const editableCookies = cConfig.blocks.flatMap((item) =>
    item.editable ? item.cookies : []
  );

  const calculateCookieDecision = (name, decision) => ({
    [name]: { decision, time: new Date() },
  });

  const setCookieDecision = (names, decision) => {
    let newValues = { ...cookieConsentChoice };

    logger.debug("[ScrivitoCookieBanner] set consent:", names, decision);

    names.forEach((name) => {
      newValues = { ...newValues, ...calculateCookieDecision(name, decision) };
    });

    logger.debug("[ScrivitoCookieBanner] save consents:", newValues);

    setCookieConsentChoice(newValues);
    setCookieValue(consentCookieName, newValues);
  };

  const isAccepted = (name) => {
    const current = cookieConsentChoice[name]?.decision;
    return current === ACCEPTED;
  };

  const switchDecision = (name) => {
    const current = cookieConsentChoice[name]?.decision;
    setCookieDecision([name], current === ACCEPTED ? DECLINED : ACCEPTED);
  };

  const switchBannerMode = () => {
    setBannerMode(bannerMode === EXTENDED_MODE ? SIMPLE_MODE : EXTENDED_MODE);
  };

  const isCookieConsentEmpty = () =>
    Object.keys(cookieConsentChoice).length === 0;

  const saveAndClose = (decision) => {
    if (decision === ACCEPTED || decision === DECLINED) {
      setCookieDecision(editableCookies, decision);
    } else if (isCookieConsentEmpty()) {
      setCookieDecision(editableCookies, DECLINED);
    }
    setBannerVisibility(false);
  };

  const isCookieTypeAccepted = (typeName) => {
    const accepted = cookieTypeNames(typeName).find(
      (name) => cookieConsentChoice[name]?.decision === ACCEPTED
    );
    return !!accepted;
  };

  const cookieTypeNames = (typeName) =>
    cConfig.blocks.find((item) => item.name === typeName)?.cookies || [];

  const cookieKeysForName = (cookieName) =>
    cConfig.technicalNames
      ? [cConfig.technicalNames[cookieName]].flat().filter((n) => n)
      : [];

  return (
    <CookieConsentContext.Provider
      value={{
        hydrated,
        I18n,
        logoUrl,
        bannerVisibility,
        config: cConfig,
        cookieConsentChoice,
        saveAndClose,
        isAccepted: (cookieName) => isAccepted(cookieName),
        switchDecision: (cookieName) => switchDecision(cookieName),
        setBannerVisibility: (choice) => setBannerVisibility(choice),
        switchBannerMode: () => switchBannerMode(),
        isExtendedMode: () => bannerMode === EXTENDED_MODE,
        isCookieTypeAccepted: (typeName) => isCookieTypeAccepted(typeName),
        cookieKeysForName: (cookieName) => cookieKeysForName(cookieName),
        switchCookiesOfType: (typeName, shouldAccept) =>
          setCookieDecision(
            cookieTypeNames(typeName),
            shouldAccept ? ACCEPTED : DECLINED
          ),
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return React.useContext(CookieConsentContext);
}
