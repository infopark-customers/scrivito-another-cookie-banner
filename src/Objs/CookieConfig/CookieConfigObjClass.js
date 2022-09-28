import * as Scrivito from "scrivito";

const CookieConfig = Scrivito.provideObjClass("CookieConfig", {
  attributes: {
    body: "html",
    title: "string",
    showInNavigation: "boolean",
    logo: ["reference", { only: "Image" }],
    links: "linklist",
  },
});

export default CookieConfig;
