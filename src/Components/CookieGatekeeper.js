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
          `CookieDeclinedPlaceholder.${cookieName}.iconClass`,
          {
            ns: "cookieBanner",
          }
        )}
        title={I18n.t(
          `CookieDeclinedPlaceholder.${cookieName}.title`,
          {
            ns: "cookieBanner",
          }
        )}
        text={I18n.t(
          `CookieDeclinedPlaceholder.${cookieName}.text`,
          {
            ns: "cookieBanner",
          }
        )}
        buttonText={I18n.t(
          "CookieDeclinedPlaceholder.buttonText",
          { ns: "cookieBanner" }
        )}
      />
    );
  }
  return children;
}

export default CookieGatekeeper;
