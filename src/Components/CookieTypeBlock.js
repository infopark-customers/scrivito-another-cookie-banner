import * as React from "react";
import Accordion from "react-bootstrap/Accordion";
import className from "classnames";
import SingleCookieBlock from "./SingleCookieBlock";
import { useCookieConsent } from "./CookieConsentContext";
import { onKeyAccess } from "../utils/accessibilityHelper";

function CookieTypeBlock({ cookieDescription, eventKey }) {
  const { switchCookiesOfType, isCookieTypeAccepted, I18n } =
    useCookieConsent();
  const { name: typeName, cookies, editable } = cookieDescription;

  const handleKeyDown = (keyEvent) => {
    if (keyEvent.key === " ") {
      keyEvent.preventDefault();
      keyEvent.stopPropagation();
    }

    const toggledCookieAcceptence = !isCookieTypeAccepted(typeName);

    onKeyAccess(keyEvent, () =>
      switchCookiesOfType(typeName, toggledCookieAcceptence)
    );
  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header as="div">
        {/* TODO: all must be treated as nested  in Button element */}
        <span className="header-text-wrapper">
          <span>
            {/* TODO: <span> pretending to be <h6>  */}
            {I18n.t(`cookieDefinitions.${typeName}.title`, {
              ns: "cookieBanner",
            })}
          </span>
          <span>
            {/* TODO: span pretendig to be <p> */}
            {I18n.t(`cookieDefinitions.${typeName}.description`, {
              ns: "cookieBanner",
            })}
          </span>
        </span>
        <span className="toggle-btn-wrapper">
          <label
            className={className("toggle-btn", { "is-disabled": !editable })}
          >
            <span
              className="d-none"
              title={I18n.t(`cookieDefinitions.${typeName}.buttons.all.title`, {
                ns: "cookieBanner",
              })}
            >
              {I18n.t(`cookieDefinitions.${typeName}.buttons.all.title`, {
                ns: "cookieBanner",
              })}
            </span>
            <input
              type="checkbox"
              onChange={(event) =>
                switchCookiesOfType(typeName, event.target.checked)
              }
              checked={isCookieTypeAccepted(typeName)}
              disabled={!editable}
              value="accepted"
              onKeyDown={handleKeyDown}
            />
            <span className="slider"></span>
          </label>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <form className="accordion accordion-info">
          {cookies.map((cookie, indx) => (
            <SingleCookieBlock
              key={`c-${indx}`}
              blockName={typeName}
              cookieName={cookie}
              editable={editable}
            />
          ))}
        </form>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default CookieTypeBlock;
