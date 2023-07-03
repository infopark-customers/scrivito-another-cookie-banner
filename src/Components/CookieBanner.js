import * as React from "react";
import { Modal } from "react-bootstrap";
import { useCookieConsent } from "./CookieConsentContext";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "../assets/main.scss";

export default function CookieBanner() {
  const { bannerVisibility, switchBannerMode, I18n } = useCookieConsent();
  return (
    <Modal
      backdrop="static"
      backdropClassName="cookie-banner-modal-bkgrd"
      centered
      animation={false}
      className="cookie-banner cookie-banner-iso"
      show={bannerVisibility}
      onHide={() => switchBannerMode()}
      scrollable
      aria-label={I18n.t(`CookieBanner.label`, { ns: "cookieBanner" })}
      keyboard={false}
    >
      <Header />
      <Body />
      <Footer />
    </Modal>
  );
}
