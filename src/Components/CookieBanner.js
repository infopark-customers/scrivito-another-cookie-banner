import * as React from "react";
import { Modal } from "react-bootstrap";
import { useCookieConsent } from "./CookieConsentContext";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "../assets/main.scss";

export default function CookieBanner({ hideOnLoad }) {
  const {
    bannerVisibility,
    switchBannerMode,
    setBannerVisibility,
    cookieExists,
  } = useCookieConsent();

  React.useEffect(() => {
    if (!cookieExists() && !hideOnLoad) {
      setBannerVisibility(true);
    }
  }, []);

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
    >
      <Header />
      <Body />
      <Footer />
    </Modal>
  );
}
