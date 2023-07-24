import * as React from "react";
import { Button } from "react-bootstrap";

import { useCookieConsent } from "./CookieConsentContext";
import { onKeyAccess } from "../utils/accessibilityHelper";

function CookieDeclinedPlaceholder({
  name,
  iconClass,
  title,
  text,
  buttonText,
}) {
  const { switchDecision } = useCookieConsent();

  return (
    <div className="map-container-message cookie-declined-placeholder">
      <div>
        <i className={iconClass} />
        <h5>{title}</h5>
        <p>{text}</p>
        <Button
          variant="primary"
          className="btn-cta"
          onClick={() => switchDecision(name)}
          onKeyDown={(keyEvent) =>
            onKeyAccess(keyEvent, () => switchDecision(name))
          }
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
export default CookieDeclinedPlaceholder;
