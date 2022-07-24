import { config as dotenvConfig } from "dotenv";
import { environmentValidator } from "../../helpers/environment-validator";
import { app } from "../config/apps";
import { executeDB } from "../config/database";

(async () => {
  environmentValidator();
  dotenvConfig({
    path: `./src/main/environments/.env.${process.env.NODE_ENV}`,
  });
  await executeDB();

  app();
})();
