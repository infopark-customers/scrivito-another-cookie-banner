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

Some blocks in translation files depends on cookies configurations. 

`CookieDeclinedPlaceholder`: contains translations for Gatekeeper-Component. 
To define diffrent localization for different cookies you have to define new block under `CookieDeclinedPlaceholder` which have same name like your cookie. e.g for cookie named `gmap` you should create block:
```
  "gmap": {
    "iconClass": "fas fa-map-marked-alt",
    "title": "Cookies abgelehnt",
    "text": "Sie haben der Verwendung von Cookies nicht zugestimmt. Solange Sie die Zustimmung nicht gegeben haben, wird dieses Element nicht dargestellt."
  }
```

Next dynamic blocks are trasnslations for expanded banner view. 
Under the key  `cookieDefinitions` you have to define blocks for each cookie-group. 
Inside of such groups you alse have to define descriptions for every cookie.
``` 
  "cookieDefinitions": {
    "functional": {
      "buttons": {
        "all": {
          "title": "Alle Cookies"
        }
      },
      "title": "Funktionell",
      "description": "Mit dieses Cookies werden Ihnen auf der Webseite zusätzliche Funktionen bereitgestellt.",
      "cookies": {
        "gmap": {
          "title": "Google Maps",
          "description": {
            "title": "Google",
            "text": "Dieses Cookie wird vom Google ('google.com') gesetzt."
          }
        },
        "vimeo": {
          "title": "Vimeo Video",
          "description": {
            "title": "Vimeo",
            "text": "Dieses Cookie wird vom Video-Host-Service 'vimeo.com' gesetzt."
          }
        }
      }
    },
    "essential": {
      "title": "Essentiell",
      "description": "Diese Cookies werden für die Grundfunktionen der Website benötigt.",
      "cookies": {
        "authentication": {
          "title": "Authentifizierung",
          "description": {
            "title": "Authentifizierung",
            "text": "In diesem Cookie wird die Information über den aktuell an der Seite angemeldenten Benutzer gespeichert."
          }
        },
        "cookie_consent": {
          "title": "Cookie-Zustimmung",
          "description": {
            "title": "Cookie-Zustimmung",
            "text": "In diesem Cookie wird Ihre Zustimmung über die Verwendung der Cookies gepeichert."
          }
        }
      }
    }
  },
```

## Usage in React.js

### Context Provider

####Initialize Context provider

```
import { CookieConsentProvider, CookieBanner } from "scrivito-cookie-banner";
import cookieConfig from "./config/cookieBannerConfig.json";
import cookieBannerTranslationsDe from "./config/locales/cookieBanner/de.json";
import logoUrl "./assets/logoUrl.json
....
const cookieBannerTranslations = {de: cookieBannerTranslationsDe};
...
  <CookieConsentProvider
    cookieConfig={cookieConfig}
    language="de"
    translations={cookieBannerTranslations}
    logoUrl={logoUrl}
  >
  ....
  <CookieBanner hideOnLoad={Scrivito.isEditorLoggedIn()} />
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
