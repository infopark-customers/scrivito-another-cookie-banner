import * as React from "react";
import { useCookieConsent } from "./CookieConsentContext";
import CookieDeclinedPlaceholder from "./CookieDeclinedPlaceholder";

function CookieGatekeeper({ children, cookieName }) {
  const { isAccepted, I18n, hydrated } = useCookieConsent();

  if (hydrated && isAccepted(cookieName)) {
    return <>{children}</>;
  }

  return (
    <CookieDeclinedPlaceholder
      name={cookieName}
      iconClass={I18n.t(`CookieDeclinedPlaceholder.${cookieName}.iconClass`, {
        ns: "cookieBanner",
      })}
      title={I18n.t(`CookieDeclinedPlaceholder.${cookieName}.title`, {
        ns: "cookieBanner",
      })}
      text={I18n.t(`CookieDeclinedPlaceholder.${cookieName}.text`, {
        ns: "cookieBanner",
      })}
      buttonText={I18n.t("CookieDeclinedPlaceholder.buttonText", {
        ns: "cookieBanner",
      })}
    />
  );
}

export default CookieGatekeeper;
