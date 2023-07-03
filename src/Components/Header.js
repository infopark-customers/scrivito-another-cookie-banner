import * as React from "react";
import { Modal } from "react-bootstrap";
import { useCookieConsent } from "./CookieConsentContext";

export default function Header() {
  const { logoUrl, I18n } = useCookieConsent();
  return (
    <Modal.Header>
      {logoUrl && (
        <img
          src={logoUrl}
          alt={I18n.t("BannerHeader.logoAlt", { ns: "cookieBanner" })}
          className="img-fluid"
        />
      )}
    </Modal.Header>
  );
}
