import * as React from "react";
import { Modal, Accordion } from "react-bootstrap";
import CookieTypeBlock from "./CookieTypeBlock";
import { useCookieConsent } from "./CookieConsentContext";
import { onLinkAccess } from "../utils/accessibilityHelper";

export default function Body() {
  const { config, isExtendedMode, I18n } = useCookieConsent();

  const renderExtendedMode = () => (
    <Modal.Body>
      <h5>{I18n.t("settings.title", { ns: "cookieBanner" })}</h5>
      <div className="sm-white-space" />
      <Accordion defaultActiveKey="0">
        {config.blocks.map((item, index) => (
          <CookieTypeBlock
            key={`c-${index}`}
            cookieDescription={item}
            eventKey={index}
          />
        ))}
      </Accordion>
    </Modal.Body>
  );

  const renderSimpleBanner = () => (
    <Modal.Body>
      <h5>{I18n.t("SimpleBanner.title", { ns: "cookieBanner" })}</h5>
      <div
        dangerouslySetInnerHTML={{
          __html: I18n.t("SimpleBanner.text", { ns: "cookieBanner" }),
        }}
      />
      <ul className="inline-no-list-type">
        {I18n.t("SimpleBanner.links", {
          ns: "cookieBanner",
          returnObjects: true,
        }).map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              title={item.title}
              target="_blank"
              rel="noreferrer"
              onKeyDown={onLinkAccess}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </Modal.Body>
  );

  return isExtendedMode() ? renderExtendedMode() : renderSimpleBanner();
}
