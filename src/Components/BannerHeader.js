import * as React from "react";
import * as Scrivito from "scrivito";
import { Modal } from "react-bootstrap";

function BannerHeader({ obj, closeButton = false }) {
  const logo = obj.get("logo");
  return (
    <Modal.Header closeButton={closeButton}>
      {logo && (
        <Scrivito.ImageTag
          content={logo}
          className="img-fluid"
          alt={logo.get("alternativeText")}
        />
      )}
    </Modal.Header>
  );
}
export default Scrivito.connect(BannerHeader);
