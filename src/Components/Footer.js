
import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { useCookieConsent } from "./CookieConsentContext";

export default function Footer() {
  const { 
    setBannerVisibility, 
    acceptAll, 
    declineAll,
    switchBannerMode, 
    isExtendedMode,
    I18n,
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
        <a role="button" onClick={() => switchBannerMode()}>
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