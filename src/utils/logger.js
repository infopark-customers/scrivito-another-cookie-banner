/* eslint no-console: "off" */

function info(...args) {
  console.log.apply(null, args);
}

function debug(...args) {
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("ScrivitoCookieBanner.debug") === "true") {
      console.log.apply(null, args);
    }
  }
}

const logger = {
  info,
  debug,
};

export default logger;
