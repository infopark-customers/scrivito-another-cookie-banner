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
    <div className="form-check">
      <input
        className="form-check-input"
        id={cookieName}
        type="checkbox"
        checked={!editable || isAccepted(cookieName)}
        onChange={() => switchDecision(cookieName)}
        onKeyDown={(keyEvent) => handleKeyDown(keyEvent, cookieName)}
        disabled={!editable}
      />
      <label className="form-check-label" htmlFor={cookieName}>
        {I18n.t(`cookieDefinitions.${blockName}.cookies.${cookieName}.title`, {
          ns: "cookieBanner",
        })}
        {cookieKeys.length > 0 && <span>{cookieKeys.join(", ")}</span>}
      </label>
      <InformationBlock cookieName={cookieName} disabled={!editable}>
        <small>
          {I18n.t(
            `cookieDefinitions.${blockName}.cookies.${cookieName}.description.title`,
            { ns: "cookieBanner" }
          )}
        </small>
        <p>
          {I18n.t(
            `cookieDefinitions.${blockName}.cookies.${cookieName}.description.text`,
            { ns: "cookieBanner" }
          )}
        </p>
      </InformationBlock>
    </div>
  );
}
export default SingleCookieBlock;
