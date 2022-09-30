import * as React from "react";
import { Modal, Button, Accordion } from "react-bootstrap";
import BannerHeader from "./BannerHeader";
import CookieTypeBlock from "./CookieTypeBlock";
import { useCookieConsent } from "./CookieConsentContext";

import I18n from "../config/i18n";

function ExtendedCookieBanner() {
  const { setBannerVisibility, acceptAll, cookieBlocks, bannerVisibility, switchBannerMode, isExtendedMode } = useCookieConsent();

  return (
    <Modal
      className="cookie-banner modal-dialog-scrollable"
      show={bannerVisibility && isExtendedMode()}
      onHide={() => switchBannerMode()}
    >
      <BannerHeader closeButton={true} />
      <Modal.Body>
        <h5>{I18n.t("settings.title", { ns: "cookieBanner" })}</h5>
        <div className="sm-white-space" />
        <Accordion className="accordion">
          {cookieBlocks().map((item, index) => (
            <CookieTypeBlock
              key={`c-${index}`}
              cookieDescription={item}
              eventKey={index}
            />
          ))}
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setBannerVisibility(false)}>
          {I18n.t("buttons.saveAndClose", { ns: "cookieBanner" })}
        </Button>
        <Button variant="primary" onClick={() => acceptAll()}>
          {I18n.t("buttons.acceptAll", { ns: "cookieBanner" })}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ExtendedCookieBanner;
