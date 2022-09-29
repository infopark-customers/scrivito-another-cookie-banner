import * as React from "react";
import { useCookieConsent } from "./CookieConsentContext";
import CookieDeclinedPlaceholder from "./CookieDeclinedPlaceholder";
import I18n from "../config/i18n";

function CookieGatekeeper({ children, cookieName }) {
  const { isAccepted } = useCookieConsent();
  if (!isAccepted(cookieName)) {
    return (
      <CookieDeclinedPlaceholder
        name={cookieName}
        iconClass={I18n.t(
          `CookieBanner.CookieDeclinedPlaceholder.${cookieName}.iconClass`,
          {
            ns: "live",
          }
        )}
        title={I18n.t(
          `CookieBanner.CookieDeclinedPlaceholder.${cookieName}.title`,
          {
            ns: "live",
          }
        )}
        text={I18n.t(
          `CookieBanner.CookieDeclinedPlaceholder.${cookieName}.text`,
          {
            ns: "live",
          }
        )}
        buttonText={I18n.t(
          "CookieBanner.CookieDeclinedPlaceholder.buttonText",
          { ns: "live" }
        )}
      />
    );
  }
  return children;
}

export default CookieGatekeeper;
