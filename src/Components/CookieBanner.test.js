import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { CookieConsentProvider } from "./CookieConsentContext";
import CookieBanner from "./CookieBanner";

let mockIsCookieSet = false;

jest.mock("utils/cookie", () => ({
  __esModule: true,
  getCookieValue: () => {
    if (mockIsCookieSet === false) {
      return {};
    }

    return {
      matomo: {
        decision: "accepted",
        time: "2023-09-19T14:00:51.528Z",
      },
      gmap: {
        decision: "declined",
        time: "2023-09-19T14:00:50.756Z",
      },
      vimeo: {
        decision: "declined",
        time: "2023-09-19T14:00:50.756Z",
      },
    };
  },
}));

describe("<CookieBanner />", () => {
  describe("in simple mode", () => {
    beforeEach(async () => {
      await render(
        <CookieConsentProvider language="de">
          <CookieBanner />
        </CookieConsentProvider>
      );
    });

    it("shows header and 3 buttons", () => {
      expect(
        screen.getByText("Nutzung von Cookies und andere Technologien.")
      ).toBeInTheDocument();

      const button1 = screen.getByRole("button", { name: /Einstellungen/i });
      expect(button1).toBeInTheDocument();
      const button2 = screen.getByRole("button", { name: /Alle zulassen/i });
      expect(button2).toBeInTheDocument();
      const button3 = screen.getByRole("button", { name: /Alle ablehnen/i });
      expect(button3).toBeInTheDocument();
    });
  });

  describe("in extended mode", () => {
    beforeEach(async () => {
      await render(
        <CookieConsentProvider language="de">
          <CookieBanner />
        </CookieConsentProvider>
      );

      const button = screen.getByRole("button", { name: /Einstellungen/i });
      fireEvent.click(button);
    });

    it("shows header and 3 buttons", () => {
      expect(screen.getByText("Cookie-Einstellungen")).toBeInTheDocument();

      const button2 = screen.getByRole("button", {
        name: /Speichern und schliessen/i,
      });
      expect(button2).toBeInTheDocument();
      const button3 = screen.getByRole("button", { name: /Alle zulassen/i });
      expect(button3).toBeInTheDocument();
    });
  });

  describe("when consents in cookie are set", () => {
    beforeEach(async () => {
      mockIsCookieSet = true;

      await render(
        <CookieConsentProvider language="de">
          <CookieBanner />
        </CookieConsentProvider>
      );
    });

    it("does not show modal", () => {
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
