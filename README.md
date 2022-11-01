# Scrivito another cookie banner

This cookie banner can be used for multiple subdomains. It save cookie consent as domain wide cookie. 

## Configuration

Banner can be configurated via json structure. 

Example:
```
{
  "name": "_bima_cookie_consent",
  "technicalNames": {
    "gmap": [],
    "authentication": ["_doorkeeper_session", "rack.session"],
    "cookie_consent": ["_cookie_consent"]
  },
  "blocks": [
    {
      "name": "functional",
      "preset": "declined",
      "editable": true,
      "cookies": [
        "gmap"
      ]
    },
    {
      "name": "essential",
      "preset": "accepted",
      "editable": false,
      "cookies": [
        "authentication",
        "cookie_consent"
      ]
    }
  ]
}
```
## Translations
I18next is used for localization. There are some standard localization which can be overritten by configuration.

## Usage in React.js

### Context Provider

####Initialize Context provider

```
import { CookiesProvider } from "react-cookie";
import { CookieConsentProvider, CookieBanner } from "scrivito-cookie-banner";
import cookieConfig from "./config/cookieBannerConfig.json";
import cookieBannerTranslationsDe from "./config/locales/cookieBanner/de.json";
import logoUrl "./assets/logoUrl.json
....
const cookieBannerTranslations = {de: cookieBannerTranslationsDe};
...
<CookiesProvider>
...
  <CookieConsentProvider
    cookieConfig={cookieConfig}
    language="de"
    translations={cookieBannerTranslations}
    inEditorMode={Scrivito.isEditorLoggedIn()}
    isExcludedPage={
      Scrivito.currentPage().get("hideCookieBanner") || false
    }
    logoUrl={logoUrl}
  >
  ....
  <CookieBanner />
 </CookieConsentProvider 
...
</CookiesProvider>
```

####Open banner after it was close:
```
import { useCookieConsent } from "scrivito-cookie-banner";

function Footer() {
  const { setBannerVisibility } = useCookieConsent();
  return (
    <a href="#bottom" onClick={() => setBannerVisibility(true)}>
      Open cookie settings
    </a>
  )
}
export default Footer;

```

####Use Gatekeeper component

```
import { CookieGatekeeper } from "scrivito-cookie-banner";

function MapComponent() {
  return (
    <CookieGatekeeper cookieName="gmap">
      <GoogleMapComponent />
    </CookieGatekeeper>
  )
}

```
Aslong user don't accepted usage of Cookie named gmap (s. configuration) children component wont be rendered
