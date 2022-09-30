import * as React from "react";
import * as Scrivito from "scrivito";
import SimpleCookieBanner from "./SimpleCookieBanner";
import ExtendedCookieBanner from "./ExtendedCookieBanner";

function CookieBanner() {
  return (
    <>
      <ExtendedCookieBanner />
      <SimpleCookieBanner />
    </>
  )
}

export default Scrivito.connect(CookieBanner);
