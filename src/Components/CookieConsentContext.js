import * as React from "react";
import { useCookies } from "react-cookie";
import domainName from "../utils/domainName";
import defaultConfig from "../config/cookieConfiguration.json";
import I18n from "../config/i18n";

const CookieConsentContext = React.createContext({});

export function CookieConsentProvider({
  cookieConfig,
  logoUrl,
  children,
  language,
  translations,
  inEditorMode,
}) {
  const cConfig = cookieConfig || defaultConfig;
  const COOKIE_NAME = cConfig.name || defaultConfig.name;
  const ACCEPTED = "accepted";
  const DECLINED = "declined";
  const EXTENDED_MODE = "expanded";
  const SIMPLE_MODE = "simple";

  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  const [pageIsExcluded, setPageIsExcluded] = React.useState(false);
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

  const [bannerVisibility, setBannerVisibility] = React.useState(false);

  const [cookieConsentChoice, setCookieConsentChoice] = React.useState(
    cookies[COOKIE_NAME] || {}
  );
  const [bannerMode, setBannerMode] = React.useState(SIMPLE_MODE);

  const setDecisionForAllCookies = (decision) => {
    setCookieDecision(editableCookies, decision);
    setBannerVisibility(false);
  };

  React.useEffect(() => {
    if (inEditorMode) {
      setBannerVisibility(false);
      return;
    }
    if (pageIsExcluded) {
      setBannerVisibility(false);
      return;
    }
    if (!cookies[COOKIE_NAME]) {
      setBannerVisibility(true);
    }
  }, [cookies, COOKIE_NAME, inEditorMode, pageIsExcluded]);

  const editableCookies = cConfig.blocks.flatMap((item) =>
    item.editable ? item.cookies : []
  );

  const saveDecision = (value) => {
    setCookieConsentChoice(value);
    const options = {
      path: "/",
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    };
    const dName = domainName(window.location.hostname);
    if (dName) {
      options.domain = dName;
    }
    setCookie(COOKIE_NAME, value, options);
  };

  const calculateCookieDecision = (name, decision) => ({
    [name]: { decision, time: new Date() },
  });

  const setCookieDecision = (names, decision) => {
    let newValues = { ...cookieConsentChoice };
    names.forEach((name) => {
      newValues = { ...newValues, ...calculateCookieDecision(name, decision) };
    });
    saveDecision(newValues);
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
        I18n,
        logoUrl,
        cookieBlocks: () => cConfig.blocks,
        cookieConsentChoice,
        bannerVisibility,
        acceptAll: () => setDecisionForAllCookies(ACCEPTED),
        declineAll: () => setDecisionForAllCookies(DECLINED),
        isAccepted: (cookieName) => isAccepted(cookieName),
        switchDecision: (cookieName) => switchDecision(cookieName),
        setBannerVisibility: (choice) => setBannerVisibility(choice),
        switchBannerMode: () => switchBannerMode(),
        isExtendedMode: () => bannerMode === EXTENDED_MODE,
        isCookieTypeAccepted: (typeName) => isCookieTypeAccepted(typeName),
        cookieKeysForName: (cookieName) => cookieKeysForName(cookieName),
        setPageIsExcluded: (value) => setPageIsExcluded(value),
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
