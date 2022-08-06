import winston from "winston";

type TSingletonLogger = winston.Logger;

class Logger {
  private myCustomLevels = {
    /**
     * Logging levels
     */
    levels: {
      /**
       * Description: Catch error events
       * {@label error}
       */
      error: 0,
      /**
       * Description: Catch warn events
       * {@label warn}
       */
      warn: 1,
      /**
       * Description: Catch info events
       * {@label info}
       */
      info: 2,
      /**
       * Description: Catch debug events, in this case is for all events includes above events
       * {@label debug}
       */
      debug: 3,
    },
    colors: {
      error: "red",
      warn: "yellow",
      info: "green",
      debug: "orange",
    },
  };
  private static instance: TSingletonLogger;

  constructor() {}

  public static getInstance<T>(instance: TSingletonLogger): TSingletonLogger {
    if (!Logger.instance) {
      Logger.instance = instance;
    }

    return Logger.instance;
  }

  init(): winston.Logger {
    const myFormat = winston.format.printf(
      ({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      }
    );

    const logger = winston.createLogger({
      levels: this.myCustomLevels.levels,
      format: winston.format.combine(
        winston.format.label({ label: "Message detected 👉 :" }),
        winston.format.timestamp(),
        myFormat
      ),
      transports: [
        new winston.transports.File({
          filename: "error.log",
          level: "error",
          format: winston.format.json(),
        }),
        new winston.transports.File({
          filename: "debug.log",
          level: "debug",
          format: winston.format.json(),
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });

    winston.addColors(this.myCustomLevels.colors);

    return logger;
  }
}

const singletonLogger = Logger.getInstance<TSingletonLogger>(
  new Logger().init()
);

export default singletonLogger;
