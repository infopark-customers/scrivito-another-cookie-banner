import * as React from "react";
import InformationBlock from "./InformationBlock";
import I18n from "../config/i18n";
import { useCookieConsent } from "./CookieConsentContext";

function SingleCookieBlock({ blockName, cookieName, editable }) {
  const { isAccepted, switchDecision } = useCookieConsent();

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={!editable || isAccepted(cookieName)}
        onChange={() => switchDecision(cookieName)}
        disabled={!editable}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {I18n.t(
          `CookieBanner.cookieDefinitions.${blockName}.cookies.${cookieName}.title`,
          { ns: "live" }
        )}
      </label>
      <InformationBlock>
        <small>
          {I18n.t(
            `CookieBanner.cookieDefinitions.${blockName}.cookies.${cookieName}.description.title`,
            { ns: "live" }
          )}
        </small>
        <p>
          {I18n.t(
            `CookieBanner.cookieDefinitions.${blockName}.cookies.${cookieName}.description.text`,
            { ns: "live" }
          )}
        </p>
      </InformationBlock>
    </div>
  );
}
export default SingleCookieBlock;
