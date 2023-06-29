import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { useCookieConsent } from "./CookieConsentContext";
import { onKeyAccess } from "../utils/accessibilityHelper";

export default function Footer() {
  const {
    saveAndClose,
    acceptAll,
    declineAll,
    switchBannerMode,
    isExtendedMode,
    I18n,
  } = useCookieConsent();
  if (isExtendedMode()) {
    return (
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={saveAndClose}
          onKeyDown={(keyEvent) => onKeyAccess(keyEvent, () => saveAndClose())}
          className="btn-cta"
        >
          {I18n.t("buttons.saveAndClose", { ns: "cookieBanner" })}
        </Button>
        <Button
          variant="primary"
          onClick={acceptAll}
          onKeyDown={(keyEvent) => onKeyAccess(keyEvent, () => acceptAll())}
          className="btn-cta"
        >
          {I18n.t("buttons.acceptAll", { ns: "cookieBanner" })}
        </Button>
      </Modal.Footer>
    );
  }
  return (
    <Modal.Footer>
      <button
        onClick={switchBannerMode}
        onKeyDown={(keyEvent) =>
          onKeyAccess(keyEvent, () => switchBannerMode())
        }
        className="btn-cta btn btn-no-border"
      >
        {I18n.t("buttons.settings", { ns: "cookieBanner" })}
      </button>
      <Button
        variant="primary"
        onClick={acceptAll}
        onKeyDown={(keyEvent) => onKeyAccess(keyEvent, () => acceptAll())}
        className="btn-cta"
      >
        {I18n.t("buttons.acceptAll", { ns: "cookieBanner" })}
      </Button>
      <Button
        variant="primary"
        onClick={declineAll}
        onKeyDown={(keyEvent) => onKeyAccess(keyEvent, () => declineAll())}
        className="btn-cta"
      >
        {I18n.t("buttons.declineAll", { ns: "cookieBanner" })}
      </Button>
    </Modal.Footer>
  );
}
