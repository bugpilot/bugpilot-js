export type Metadata = {
  triggerType: "sdk" | "autopilot" | "wss" | "helpdesk" | "widget" | string;
  triggerSource: never;
  userProvidedDescription: string;
  errorInfo: {
    isErrorNew: boolean;
    isUserNew: boolean;
    numOccurences: number;
    numAffectedUsers: number;
    originalReportId: string;
  };
  [key: string]: any;
};

export type WorkspaceSettings = {
  id: string;
  flags: never;
  overQuota: boolean;
  sampleRecordingAllUrls?: [];
  sampleRecordingPercentage: number;
  sampleRecordingAll: "manual" | "auto";
  apiWebsocketMode: "manual" | "always-on";
  enableUserWidgetV2: boolean;
  userWidgetPosition: "left" | "bottom";
  showWidgetBranding: boolean;
  shouldRequireUserDescription: boolean;
  widgetSettings: {
    customCSS: string;
    idleText: string;
    inProgressText: string;
    successText: string;
    elementSelector?: string;
  };
  recordLocalStorage: "all" | "off" | "custom";
  recordLocalStorageFields: string[];
  recordSessionStorage: "all" | "off" | "custom";
  recordSessionStorageFields: string[];
  recordCookies: "all" | "off" | "custom";
  recordCookiesFields: string[];
  shouldRecordUUIDs?: boolean;
  piiRemovalMode?: "manual" | "auto";
  helpdeskRecordingMode: "manual" | "auto";
};

export type User = {
  id?: string | null;
  email?: string | null;
  [key: string]: any;
};

export type ReportData = {
  id: string;
  v: string;
  companyId: string;
  user: User | null;
  metadata: Partial<Metadata>;
  mode: "session" | "recording";
  sessionId: string | null;
  sessionToken: string;
  scriptVersion: string | undefined;
  url: string;
  pageTitle: string;
  userAgent: string;
  language: string;
  source: string;
  sourceInfo: Record<string, unknown>;
  localStorage: Record<string, unknown>;
  sessionStorage: Record<string, unknown>;
  cookies: Record<string, unknown>;
  screen: {
    width: number;
    height: number;
  };
  window: {
    width: number;
    height: number;
  };
  timeZone: string;
  startedAt: number;
  chatUserId: string;
  timeOrigin: number | undefined;
  timing: Record<string, unknown> | undefined;
  firstPaint: PerformanceEntry | null;
  firstContentfulPaint: PerformanceEntry | null;
  connection: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  } | null;
  autopilotErrors?: AutopilotError[];
  reportGroupId?: string;
};
