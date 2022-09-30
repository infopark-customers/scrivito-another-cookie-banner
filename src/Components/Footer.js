
import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { useCookieConsent } from "./CookieConsentContext";
import I18n from "../config/i18n";

export default function Footer() {
  const { 
    setBannerVisibility, 
    acceptAll, 
    switchBannerMode, 
    isExtendedMode 
  } = useCookieConsent();
  if (isExtendedMode()) {
    return (
      <Modal.Footer>
        <Button variant="primary" onClick={() => setBannerVisibility(false)}>
          {I18n.t("buttons.saveAndClose", { ns: "cookieBanner" })}
        </Button>
        <Button variant="primary" onClick={() => acceptAll()}>
          {I18n.t("buttons.acceptAll", { ns: "cookieBanner" })}
        </Button>
      </Modal.Footer>
    )
  }
  return (
      <Modal.Footer>
        <a className="select cookies link" href="#" onClick={() => switchBannerMode()}>
          {I18n.t("buttons.settings", { ns: "cookieBanner" })}
        </a>
        <Button variant="primary" onClick={() => acceptAll()}>
          {I18n.t("buttons.acceptAll", { ns: "cookieBanner" })}
        </Button>
        <Button variant="primary" onClick={() => declineAll()}>
          {I18n.t("buttons.declineAll", { ns: "cookieBanner" })}
        </Button>
      </Modal.Footer>
  )
}