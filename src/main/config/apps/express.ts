import express from "express";
import { globalRouter } from "../../../pojos/GlobalRouter";
import singletonLogger from "../Logger";
import "../../../controllers/TagsController";
import "../../../controllers/UserTypesController";

export const expressApp = () => {
  try {
    const app = express();
    const jsonParser = express.json();
    app.use(jsonParser);

    app.use(globalRouter);

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
    console.log("test", error);
    singletonLogger.log({
      level: "error",
      message: "Failed on load express app!",
    });

    return null;
  }
};
