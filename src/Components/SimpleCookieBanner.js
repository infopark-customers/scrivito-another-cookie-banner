import * as React from "react";
import * as Scrivito from "scrivito";
import { Modal, Button } from "react-bootstrap";
import I18n from "../config/i18n";
import BannerHeader from "./BannerHeader";
import { useCookieConsent } from "./CookieConsentContext";

function SimpleCookieBanner({ obj }) {
  const { acceptAll, declineAll, switchBannerMode, bannerVisibility, setBannerVisibility, isExtendedMode } = useCookieConsent();
  console.log("SimpleCookieBanner" , bannerVisibility)
  return (
    <Modal
      className="cookie-banner modal-dialog-scrollable"
      show={bannerVisibility && !isExtendedMode()}
      onHide={() => setBannerVisibility(false)}
    >
      <BannerHeader obj={obj} />
      <Modal.Body>
        <Scrivito.ContentTag tag="h5" content={obj} attribute="title" />
        <Scrivito.ContentTag content={obj} attribute="body" />
        <ul className="inline-no-list-type">
          {obj.get("links").map((link, index) => (
            <li key={index}>
              <Scrivito.LinkTag to={link} title={link.title()} target="_blank">
                {link.title()}
              </Scrivito.LinkTag>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => switchBannerMode()}>
          {I18n.t("CookieBanner.buttons.settings", { ns: "live" })}
        </Button>
        <Button variant="primary" onClick={() => acceptAll()}>
          {I18n.t("CookieBanner.buttons.acceptAll", { ns: "live" })}
        </Button>
        <Button variant="primary" onClick={() => declineAll()}>
          {I18n.t("CookieBanner.buttons.declineAll", { ns: "live" })}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SimpleCookieBanner;
