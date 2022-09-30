
import * as React from "react";
import { Modal, Button, Accordion } from "react-bootstrap";
import CookieTypeBlock from "./CookieTypeBlock";
import { useCookieConsent } from "./CookieConsentContext";

export default function Body() {
  const { 
    cookieBlocks, 
    isExtendedMode,
    I18n,
  } = useCookieConsent();

  if (isExtendedMode()) {
    return (
      <Modal.Body>
        <h5>{I18n.t("settings.title", { ns: "cookieBanner" })}</h5>
        <div className="sm-white-space" />
        <Accordion className="accordion">
          {cookieBlocks().map((item, index) => (
            <CookieTypeBlock
              key={`c-${index}`}
              cookieDescription={item}
              eventKey={index}
            />
          ))}
        </Accordion>
      </Modal.Body>
    )
  }
  return (
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
  )
}