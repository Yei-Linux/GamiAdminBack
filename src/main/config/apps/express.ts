import express from "express";
import { TagRouter, UserTypeRouter } from "../../../routes";
import singletonLogger from "../Logger";

export const expressApp = () => {
  try {
    const app = express();
    const jsonParser = express.json();
    app.use(jsonParser);

    app.use("/tags", TagRouter);
    app.use("/user-types", UserTypeRouter);

    if (process.env.IS_TESTING !== "ok") {
      app.listen(process.env.SERVER_PORT, () => {
        singletonLogger.log({
          level: "info",
          message: `Your server was setup successfull in port: ${process.env.SERVER_PORT}`,
        });
      });
    }

    return app;
  } catch (error) {
    singletonLogger.log({
      level: "error",
      message: "Failed on load express app!",
    });

    return null;
  }
};
