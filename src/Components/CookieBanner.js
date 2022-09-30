import * as React from "react";
import { Modal } from "react-bootstrap";
import { useCookieConsent } from "./CookieConsentContext";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default function CookieBanner() {
  const { 
    bannerVisibility, 
    switchBannerMode, 
  } = useCookieConsent();
  return (
    <Modal
      className="cookie-banner modal-dialog-scrollable"
      show={bannerVisibility}
      onHide={() => switchBannerMode()}
    >
      <Header />
      <Body />
      <Footer />
    </Modal>
  )
}


