import * as React from "react";
import InformationBlock from "./InformationBlock";
import { useCookieConsent } from "./CookieConsentContext";
import { onKeyAccess } from "../utils/accessibilityHelper";

function SingleCookieBlock({ blockName, cookieName, editable }) {
  const { isAccepted, switchDecision, I18n, cookieKeysForName } =
    useCookieConsent();
  const cookieKeys = cookieKeysForName(cookieName);

  const handleKeyDown = (keyEvent) => {
    onKeyAccess(keyEvent, () => switchDecision(cookieName));

    if (keyEvent.key === " ") {
      keyEvent.preventDefault();
      keyEvent.stopPropagation();
    }
  };

  return (
    <form className="accordion accordion-info">
      <div className="d-md-flex justify-content-between">
        <div className="order-md-2 mb-1">
          <div className="toggle-btn-wrapper mt-1">
            <label className="toggle-btn">
              <span className="d-none">
                {/* maybe add title lol */}
                {I18n.t(
                  `cookieDefinitions.${blockName}.cookies.${cookieName}.title`,
                  {
                    ns: "cookieBanner",
                  }
                )}
                {cookieKeys.length > 0 && <span>{cookieKeys.join(", ")}</span>}
              </span>
              {/* <input id="toggle-matomo" type="checkbox"> */}
              <input
                className="form-check-input"
                id={cookieName}
                type="checkbox"
                checked={!editable || isAccepted(cookieName)}
                onChange={() => switchDecision(cookieName)}
                onKeyDown={(keyEvent) => handleKeyDown(keyEvent, cookieName)}
                disabled={!editable}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="order-md-1 pe-md-4">
          <p className="bold">
            {I18n.t(
              `cookieDefinitions.${blockName}.cookies.${cookieName}.description.title`,
              { ns: "cookieBanner" }
            )}
          </p>
          <p>
            {I18n.t(
              `cookieDefinitions.${blockName}.cookies.${cookieName}.description.text`,
              { ns: "cookieBanner" }
            )}
          </p>
        </div>
      </div>
    </form>
  );
}
export default SingleCookieBlock;
