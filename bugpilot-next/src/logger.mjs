const LOGGER_PREFIX = "[Bugpilot]";

const logger = {
  info: (...args) => {
    console.log(LOGGER_PREFIX, ...args);
  },
  warn: (...args) => {
    console.warn(LOGGER_PREFIX, ...args);
  },
  error: (...args) => {
    console.error(LOGGER_PREFIX, ...args);
  },
  debug: (...args) => {
    console.debug(LOGGER_PREFIX, ...args);
  },
};

export default logger;
