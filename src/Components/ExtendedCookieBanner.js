import * as React from "react";
import { Modal, Button, Accordion } from "react-bootstrap";
import BannerHeader from "./BannerHeader";
import CookieTypeBlock from "./CookieTypeBlock";
import { useCookieConsent } from "./CookieConsentContext";

import I18n from "../config/i18n";

function ExtendedCookieBanner({ show, onHide, obj, cookieConfig }) {
  const { setBannerVisibility, acceptAll } = useCookieConsent();

  return (
    <Modal
      className="cookie-banner modal-dialog-scrollable"
      show={show}
      onHide={onHide}
    >
      <BannerHeader closeButton={true} obj={obj} />
      <Modal.Body>
        <h5>{I18n.t("CookieBanner.settings.title", { ns: "live" })}</h5>
        <div className="sm-white-space" />
        <Accordion className="accordion">
          {cookieConfig.map((item, index) => (
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
          {I18n.t("CookieBanner.buttons.saveAndClose", { ns: "live" })}
        </Button>
        <Button variant="primary" onClick={() => acceptAll()}>
          {I18n.t("CookieBanner.buttons.acceptAll", { ns: "live" })}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ExtendedCookieBanner;
