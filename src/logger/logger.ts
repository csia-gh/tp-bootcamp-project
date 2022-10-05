const {
  createLogger,
  format,
  transports,
} = require('winston');
const {
  timestamp,
  combine,
  printf,
  colorize,
  prettyPrint
} = format;


const logFormat = printf(({
  level,
  message,
  timestamp,
}) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
  format: combine(
    colorize(),
    prettyPrint(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    logFormat
  ),
  transports: [
    new transports.Console()
  ]
});
