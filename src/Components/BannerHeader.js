import * as React from "react";
import * as Scrivito from "scrivito";
import { Modal } from "react-bootstrap";
import defaultLogo from "../assets/bima_logo_original.png";
import I18n from "../config/i18n";

function BannerHeader({ closeButton = false }) {
  return (
    <Modal.Header closeButton={closeButton}>
      <img src={defaultLogo} alt={I18n.t("BannerHeader.logoAlt", {ns: "cookieBanner"})} className="img-fluid" />
    </Modal.Header>
  );
}
export default Scrivito.connect(BannerHeader);
