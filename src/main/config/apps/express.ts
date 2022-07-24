import express from "express";
import singletonLogger from "../Logger";

export const expressApp = () => {
  try {
    const app = express();
    app.listen(process.env.SERVER_PORT, () => {
      singletonLogger.log({
        level: "info",
        message: `Your server was setup successfull in port: ${process.env.SERVER_PORT}`,
      });
    });
  } catch (error) {
    singletonLogger.log({
      level: "error",
      message: "Failed on load express app!",
    });
  }
};
