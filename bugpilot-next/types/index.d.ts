import React, { Context } from "react";
import {
  Metadata as MetadataBase,
  ReportData as ReportDataBase,
  User as UserBase,
} from "./imported_types";

declare namespace bugpilot {
  interface Metadata extends MetadataBase {
    triggerType?: "sdk" | "autopilot" | "wss" | "helpdesk" | "widget" | string;
    triggerSource?: string;
    userProvidedDescription?: string;
    [key: string]: any;
  }

  interface ReportData extends ReportDataBase {}
  interface User extends UserBase {}

  interface BugpilotProviderProps {
    workspaceId: string;
    user?: User;
    enabled?: boolean;
  }

  export const Bugpilot: Context<BugpilotProviderProps>;

  export const useBugpilot: () => {
    saveBugReport: (
      metadata?: Metadata,
      reportDataOverride?: ReportData
    ) => void;
    identify: (user: User) => void;
    logout: () => void;
  };
}

export = bugpilot;
