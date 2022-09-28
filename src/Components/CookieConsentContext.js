import * as React from "react";
import { useCookies } from "react-cookie";

const CookieConsentContext = React.createContext({});

export function CookieConsentProvider({ cookieConfig, children }) {
  const COOKIE_NAME = "_bima_cncnt";
  const ACCEPTED = "accepted";
  const DECLINED = "declined";

  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  const [bannerVisibility, setBannerVisibility] = React.useState(false);

  const [cookieConsentChoice, setCookieConsentChoice] = React.useState(
    cookies[COOKIE_NAME] || {}
  );
  const [bannerMode, setBannerMode] = React.useState("simple");

  React.useEffect(() => {
    if (!cookies[COOKIE_NAME]) {
      setBannerVisibility(true);
    }
  }, [cookies]);

  const editableCookies = cookieConfig.flatMap((item) =>
    item.editable ? item.cookies : []
  );

  const saveDecision = (value) => {
    setCookieConsentChoice(value);
    const options = {
      path: "/",
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    };
    if (window.location.hostname !== "localhost") {
      options.domain = ".bundesimmobilien.de";
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

  const setDecisionForAllCookies = (decision) => {
    setCookieDecision(editableCookies, decision);
    setBannerVisibility(false);
  };

  const switchDecision = (name) => {
    const current = cookieConsentChoice[name]?.decision;
    setCookieDecision([name], current === ACCEPTED ? DECLINED : ACCEPTED);
  };

  const switchBannerMode = () => {
    setBannerMode(bannerMode === "extended" ? "simple" : "extended");
  };

  const isCookieTypeAccepted = (typeName) => {
    const accepted = cookieTypeNames(typeName).find(
      (name) => cookieConsentChoice[name]?.decision === ACCEPTED
    );
    return !!accepted;
  };

  const cookieTypeNames = (typeName) =>
    cookieConfig.find((item) => item.name === typeName)?.cookies || [];

  return (
    <CookieConsentContext.Provider
      value={{
        cookieConsentChoice,
        bannerVisibility,
        acceptAll: () => setDecisionForAllCookies(ACCEPTED),
        declineAll: () => setDecisionForAllCookies(DECLINED),
        isAccepted: (cookieName) => isAccepted(cookieName),
        switchDecision: (cookieName) => switchDecision(cookieName),
        setBannerVisibility: (choice) => setBannerVisibility(choice),
        switchBannerMode: () => switchBannerMode(),
        isExtendedMode: () => bannerMode === "extended",
        isCookieTypeAccepted: (typeName) => isCookieTypeAccepted(typeName),
        switchCookiesOfType: (typeName, shoudAccept) =>
          setCookieDecision(
            cookieTypeNames(typeName),
            shoudAccept ? ACCEPTED : DECLINED
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
