const BANNER = (level = "debug") => [
  `%c[@bugpilot/next]%c [${new Date().toISOString()}] %c[${level.toUpperCase()}]`,
  "color:white; font-weight: bold; border-radius: 5px; padding:2px 5px; background:purple;",
  "color:#999;",
  "color:#6060ff;",
];

const logger = {
  info: (...args) => {
    console.log(...BANNER("info"), ...args);
  },
  warn: (...args) => {
    console.warn(...BANNER("warn"), ...args);
  },
  error: (...args) => {
    console.error(...BANNER("error"), ...args);
  },
  debug: (...args) => {
    console.debug(...BANNER("debug"), ...args);
  },
};

export default logger;
