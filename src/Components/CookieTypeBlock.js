import * as React from "react";
import { Accordion } from "react-bootstrap";
import className from "classnames";
import SingleCookieBlock from "./SingleCookieBlock";
import { useCookieConsent } from "./CookieConsentContext";

function CookieTypeBlock({ cookieDescription, eventKey }) {
  const { switchCookiesOfType, isCookieTypeAccepted, I18n } = useCookieConsent();
  const { name: typeName, cookies, editable } = cookieDescription;

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header as="div">
        <span className="header-text-wrapper">
          <h6>
            {I18n.t(`cookieDefinitions.${typeName}.title`, {
              ns: "cookieBanner",
            })}
          </h6>
          <p>
            {I18n.t(`cookieDefinitions.${typeName}.description`, {
              ns: "cookieBanner",
            })}
          </p>
        </span>
        <div className="toggle-btn-wrapper">
          <label
            className={className("toggle-btn", { "is-disabled": !editable })}
          >
            <span
              className="d-none"
              title={I18n.t(
                `cookieDefinitions.${typeName}.buttons.all.title`,
                { ns: "cookieBanner" }
              )}
            >
              {I18n.t(
                `cookieDefinitions.${typeName}.buttons.all.title`,
                { ns: "cookieBanner" }
              )}
            </span>
            <input
              type="checkbox"
              onChange={(event) =>
                switchCookiesOfType(typeName, event.target.checked)
              }
              checked={!editable || isCookieTypeAccepted(typeName)}
              disabled={!editable}
              value="accepted"
            />
            <span className="slider"></span>
          </label>
        </div>
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
