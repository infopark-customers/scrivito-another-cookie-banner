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
      <div className="d-flex justify-content-between border-bottom">
        <div className="header-text-wrapper">
          <form>
            <div className="form-check">
              <input
                id={typeName}
                className="form-check-input"
                type="checkbox"
                value="accepted"
                onChange={(event) =>
                  switchCookiesOfType(typeName, event.target.checked)
                }
                onKeyDown={handleKeyDown}
                checked={!editable || isCookieTypeAccepted(typeName)}
                disabled={!editable}
              />
              <label className="form-check-label" htmlFor={typeName}>
                <span className="d-block bold">
                  {I18n.t(`cookieDefinitions.${typeName}.title`, {
                    ns: "cookieBanner",
                  })}
                </span>
                {I18n.t(`cookieDefinitions.${typeName}.description`, {
                  ns: "cookieBanner",
                })}
              </label>
            </div>
          </form>
        </div>
        <Accordion.Header>{/* display arrow block */}</Accordion.Header>
      </div>
      <Accordion.Body className={className("", { disabled: !editable })}>
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
