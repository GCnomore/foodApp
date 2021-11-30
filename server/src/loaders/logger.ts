import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logDir = "logs";
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level} ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const Logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "MM-DD-YYYY [at] HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: "Info",
      datePattern: "MM-DD-YYYY",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30, // days
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "Error",
      datePattern: "MM-DD-YYYY",
      dirname: logDir + "/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30, // days
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  Logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })`
      ),
    })
  );
}

export default Logger;
