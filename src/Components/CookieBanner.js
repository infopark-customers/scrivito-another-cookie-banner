import * as React from "react";
import * as Scrivito from "scrivito";
import SimpleCookieBanner from "./SimpleCookieBanner";
import ExtendedCookieBanner from "./ExtendedCookieBanner";

function CookieBanner() {
  const [obj] = Scrivito.Obj.onAllSites()
    .where("_objClass", "equals", "CookieConfig")
    .take(1);

  if (!obj) {
    return null;
  }
  return (
    <>
      <ExtendedCookieBanner obj={obj} />
      <SimpleCookieBanner obj={obj} />
    </>
  )
}

export default Scrivito.connect(CookieBanner);
