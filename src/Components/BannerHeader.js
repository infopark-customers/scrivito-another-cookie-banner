import * as React from "react";
import * as Scrivito from "scrivito";
import { Modal } from "react-bootstrap";

function BannerHeader({ closeButton = false }) {
  return (
    <Modal.Header closeButton={closeButton}>
      {/* url && <img src={url} alt={alt} className="img-fluid" /> */}
    </Modal.Header>
  );
}
export default Scrivito.connect(BannerHeader);
