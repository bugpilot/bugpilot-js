import React, { Context } from "react";
import {
  Metadata as MetadataBase,
  ReportData as ReportDataBase,
  User as UserBase,
} from "./imported_types";

declare namespace bugpilot {
  interface Metadata extends MetadataBase {}
  interface ReportData extends ReportDataBase {}
  interface User extends UserBase {}

  interface BugpilotProviderProps {
    workspaceId: string;
    user?: Partial<User> | null;
    enabled?: boolean;
  }

  export const Bugpilot: Context<BugpilotProviderProps>;

  export const useBugpilot: () => {
    saveBugReport: (
      metadata?: Partial<Metadata>,
      reportDataOverride?: Partial<ReportData>
    ) => void;
    identify: (user: User) => void;
    logout: () => void;
  };
}

export = bugpilot;
