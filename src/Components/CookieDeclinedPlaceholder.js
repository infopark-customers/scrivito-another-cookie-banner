import * as React from "react";
import { Button } from "react-bootstrap";
import { useCookieConsent } from "./CookieConsentContext";

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
        <Button variant="primary" onClick={() => switchDecision(name)}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
export default CookieDeclinedPlaceholder;
