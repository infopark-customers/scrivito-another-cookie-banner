import * as React from "react";
import * as Scrivito from "scrivito";

Scrivito.provideComponent("CookieConfig", ({ page }) => (
  <Scrivito.ContentTag
    tag="div"
    className="cookie-config"
    content={page}
    attribute="body"
  />
));
