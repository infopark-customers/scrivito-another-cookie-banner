import * as React from "react";
import * as Scrivito from "scrivito";
import SimpleCookieBanner from "./SimpleCookieBanner";
import ExtendedCookieBanner from "./ExtendedCookieBanner";
import { useCookieConsent } from "./CookieConsentContext";

function CookieBanner({ cookieConfig }) {
  const {
    bannerVisibility,
    setBannerVisibility,
    acceptAll,
    declineAll,
    isExtendedMode,
    switchBannerMode,
  } = useCookieConsent();

  const [obj] = Scrivito.Obj.onAllSites()
    .where("_objClass", "equals", "CookieConfig")
    .take(1);

  if (!obj) {
    return null;
  }
  return isExtendedMode() ? (
    <ExtendedCookieBanner
      cookieConfig={cookieConfig}
      show={bannerVisibility}
      onHide={() => switchBannerMode()}
      obj={obj}
    />
  ) : (
    <SimpleCookieBanner
      obj={obj}
      onDecline={() => declineAll()}
      onAccept={() => acceptAll()}
      show={bannerVisibility}
      onHide={() => setBannerVisibility(false)}
    />
  );
}

export default Scrivito.connect(CookieBanner);
