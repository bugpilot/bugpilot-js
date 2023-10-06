import React, { createContext, useCallback } from "react";

const BugpilotContext = createContext({
  saveBugReport: () => {},
  identify: () => {},
  logout: () => {},
});

export const Bugpilot = ({ children }) => {
  const saveBugReport = useCallback(() => {}, []);
  const identify = useCallback(() => {}, []);
  const logout = useCallback(() => {}, []);

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
