import I18n from "../config/i18n";

function localizeAttribute(attribute, objClass) {
  const tKey = (input) => ["editing:attributes", ...input].join(".");
  const result = {};
  ["title", "description"].forEach((key) => {
    result[key] = I18n.t([
      tKey([objClass, attribute, key]),
      tKey(["common", attribute, key]),
    ]);
  });

  ["common", objClass].forEach((key) => {
    const attrKey = tKey([key, attribute, "values"]);
    if (I18n.exists(attrKey)) {
      result.values = I18n.t(attrKey, { returnObjects: true });
    }
  });

  return result;
}

function localizeAttrList(attrList, objClass) {
  const attributes = {};
  attrList.forEach((key) => {
    attributes[key] = localizeAttribute(key, objClass);
  });
  return attributes;
}

export { localizeAttribute, localizeAttrList };
