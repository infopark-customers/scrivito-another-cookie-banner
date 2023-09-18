import * as React from "react";
import { Modal, Button } from "react-bootstrap";

import { useCookieConsent } from "./CookieConsentContext";
import { onKeyAccess } from "../utils/accessibilityHelper";
import { ACCEPTED, DECLINED } from "../utils/definitions";

export default function Footer() {
  const { saveAndClose, switchBannerMode, isExtendedMode, I18n } =
    useCookieConsent();

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
          onClick={() => saveAndClose(ACCEPTED)}
          onKeyDown={(keyEvent) =>
            onKeyAccess(keyEvent, () => saveAndClose(ACCEPTED))
          }
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
        onClick={() => saveAndClose(ACCEPTED)}
        onKeyDown={(keyEvent) =>
          onKeyAccess(keyEvent, () => saveAndClose(ACCEPTED))
        }
        className="btn-cta"
      >
        {I18n.t("buttons.acceptAll", { ns: "cookieBanner" })}
      </Button>
      <Button
        variant="primary"
        onClick={() => saveAndClose(DECLINED)}
        onKeyDown={(keyEvent) =>
          onKeyAccess(keyEvent, () => saveAndClose(DECLINED))
        }
        className="btn-cta"
      >
        {I18n.t("buttons.declineAll", { ns: "cookieBanner" })}
      </Button>
    </Modal.Footer>
  );
}
