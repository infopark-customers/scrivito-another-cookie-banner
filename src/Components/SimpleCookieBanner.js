import * as React from "react";
import * as Scrivito from "scrivito";
import { Modal, Button } from "react-bootstrap";
import I18n from "../config/i18n";
import BannerHeader from "./BannerHeader";
import { useCookieConsent } from "./CookieConsentContext";

function SimpleCookieBanner() {
  const { acceptAll, declineAll, switchBannerMode, bannerVisibility, setBannerVisibility, isExtendedMode } = useCookieConsent();
  return (
    <Modal
      className="cookie-banner modal-dialog-scrollable"
      show={bannerVisibility && !isExtendedMode()}
      onHide={() => setBannerVisibility(false)}
    >
      <BannerHeader />
      <Modal.Body>
        <h5>
          {I18n.t("SimpleBanner.title", {ns: "cookieBanner"})}
        </h5>
        <div dangerouslySetInnerHTML={{ __html: I18n.t("SimpleBanner.text", {ns: "cookieBanner"})}} />
        <ul className="inline-no-list-type">
          {I18n.t("SimpleBanner.links", {ns: "cookieBanner", returnObjects: true}).map((item, index) => 
            <li key={index}><a href={item.url} title={item.title} target="_blank">{item.title}</a></li>
          )} 
        </ul>
      </Modal.Body>
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
    </Modal>
  );
}

export default SimpleCookieBanner;
