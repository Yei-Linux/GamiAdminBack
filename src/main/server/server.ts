import { config as dotenvConfig } from "dotenv";
import { environmentValidator } from "../../helpers/environment-validator";
import { app } from "../config/apps";
import { executeDB } from "../config/database";

export const server = async () => {
  environmentValidator();
  dotenvConfig({
    path: `./src/main/environments/.env.${
      process.env.NODE_ENV || "development"
    }`,
  });
  await executeDB();
  const frameworkApp = app();

  return frameworkApp;
};

server();
