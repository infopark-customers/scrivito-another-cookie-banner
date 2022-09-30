import * as React from "react";
import { Modal } from "react-bootstrap";
import defaultLogo from "../assets/bima_logo_original.png";
import I18n from "../config/i18n";
import { useCookieConsent } from "./CookieConsentContext";

export default function Header() {
  const { 
    isExtendedMode 
  } = useCookieConsent();
  return (
    <Modal.Header closeButton={isExtendedMode()}>
      <img src={defaultLogo} alt={I18n.t("BannerHeader.logoAlt", {ns: "cookieBanner"})} className="img-fluid" />
    </Modal.Header>
  );
}
