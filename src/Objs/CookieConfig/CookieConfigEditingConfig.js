import * as Scrivito from "scrivito";
import I18n from "../../config/i18n";
import { localizeAttrList } from "../../utils/localizeAttribute";

Scrivito.provideEditingConfig("CookieConfig", {
  title: I18n.t("editing:Objs.CookieConfig.title"),
  description: I18n.t("editing:Objs.CookieConfig.description"),
  attributes: localizeAttrList(
    ["body", "showInNavigation", "title", "logo"],
    "CookieConfig"
  ),
  properties: ["title", "body", "logo", "links", "showInNavigation"],
  hideInSelectionDialogs: true,
  initialContent: {
    showInNavigation: false,
  },
});
