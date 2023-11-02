"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import logger from "./logger.mjs";
import { waitUntilBugpilotAvailable } from "./utils.mjs";

import packageJson from "../package.json";

const BUGPILOT_HOST = "https://script.bugpilot.io";
const BUGPILOT_SCRIPT_FILENAME = "adopto.js";

const makeScriptUrl = (workspaceId) => {
  const url = new URL(BUGPILOT_HOST);
  url.pathname = `${workspaceId}/${BUGPILOT_SCRIPT_FILENAME}`;
  url.searchParams.set("source", "bugpilot-next");
  url.searchParams.set("packageVersion", packageJson.version);
  return url.toString();
};

const BugpilotContext = createContext({
  saveBugReport: () => {},
  identify: (nextUser) => {},
  logout: () => {},
});

export const Bugpilot = ({
  children,
  workspaceId,
  enabled = true,
  user = {},
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (!workspaceId) {
      logger.error(
        "Missing workspaceId prop on <Bugpilot />. Please provide a `workspaceId` prop. You may get the correct embed code from your Bugpilot dashboard. Please note that, at this time, updating workspaceId after mounting the Context Provider is not supported. If you want to disable Bugpilot for a specific environment, provide an `enabled={false}` prop."
      );
      return;
    }

    if (!enabled) {
      logger.warn(
        "Bugpilot is disabled because you passed enabled={false} to the context provider."
      );
      return;
    }

    if (document.querySelector("#bugpilot-script")) {
      logger.debug(
        "Bugpilot script already loaded.",
        process.env.NODE_ENV === "development"
          ? "This is expected in dev mode because all effects run twice."
          : ""
      );
      return;
    }

    const src = makeScriptUrl(workspaceId);
    logger.debug("Loading Bugpilot script from URL", src);

    const script = document.createElement("script");
    script.id = "bugpilot-script";
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      logger.error("Bugpilot script failed to load, check for ad blockers.");
    };
    script.onload = () => {
      logger.debug("Bugpilot script loaded.");
      setLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  const saveBugReport = useCallback(
    (metadata = {}, reportDataOverride = {}) => {
      if (typeof window === "undefined") {
        return;
      }

      waitUntilBugpilotAvailable(() => {
        window.Bugpilot.saveReport(metadata, reportDataOverride);
      });
    },
    []
  );

  const identify = useCallback((nextUser) => {
    if (typeof window === "undefined") {
      return;
    }

    if (!nextUser) {
      return;
    }

    if (!nextUser?.id || !nextUser?.email) {
      logger.warn(
        "Identify was called without id and email. Please provide both id and email for optimal results."
      );
    }

    waitUntilBugpilotAvailable(() => {
      window.Bugpilot.identify(nextUser);
    });
  }, []);

  const logout = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    waitUntilBugpilotAvailable(() => {
      window.Bugpilot.lougout();
    });
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
