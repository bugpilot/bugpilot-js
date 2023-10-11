"use client";

import React, { createContext, useCallback, useEffect } from "react";
import logger from "./logger.mjs";

const BugpilotContext = createContext({
  saveBugReport: () => {},
  identify: (user) => {},
  logout: () => {},
});

export const Bugpilot = ({ children, workspaceId, user }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (document.querySelector("#bugpilot-script")) {
      logger.debug("Bugpilot script already loaded");
      return;
    }

    const src = `https://script.bugpilot.io/${workspaceId}/bugpilot.js?source=bugpilot-next`;
    logger.debug("Loading Bugpilot script from URL", src);

    const script = document.createElement("script");
    script.id = "bugpilot-script";
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      logger.error("Bugpilot script failed to load, check for ad blockers");
    };
    script.onload = () => {
      logger.debug("Bugpilot script loaded");
      setLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  const saveBugReport = useCallback(
    (metadata = {}, reportDataOverride = {}) => {
      if (typeof window === "undefined") {
        return;
      }

      if (!window.Bugpilot) {
        return;
      }

      window.Bugpilot.saveReport(metadata, reportDataOverride);
    },
    []
  );

  const identify = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!window.Bugpilot) {
      return;
    }

    if (!user) {
      return;
    }

    if (!user?.id) {
      logger.warn(
        "Bugpilot: user.id is should be provided if passing user to <Bugpilot />"
      );
    }

    window.Bugpilot.identify(user);
  }, []);

  const logout = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!window.Bugpilot) {
      return;
    }

    window.Bugpilot.lougout();
  }, []);

  useEffect(() => {
    // if user info is provided, call identify
    if (!loaded) {
      return;
    }

    if (!user) {
      return;
    }

    identify(user);
  }, [loaded, user]);

  return React.createElement(
    BugpilotContext.Provider,
    {
      value: {
        saveBugReport,
        identify,
        logout,
      },
    },
    children
  );
};

export const useBugpilot = () => useContext(BugpilotContext);
