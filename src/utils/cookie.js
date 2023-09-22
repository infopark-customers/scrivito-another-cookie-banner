import Cookies from "js-cookie";

import domainName from "./domainName";

export function getCookieValue(cookieName) {
  const cookieValue = Cookies.get(cookieName);
  try {
    return JSON.parse(cookieValue);
  } catch (e) {
    return {};
  }
}

export function setCookieValue(cookieName, value) {
  const options = {
    path: "/",
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  };
  const domain = domainName(window.location.hostname);
  if (domain) {
    options.domain = domain;
  }

  Cookies.set(cookieName, JSON.stringify(value), options);
}
