import {
  ENVIRONMENT_IS_NOT_THE_CORRECT_OPTION_AVAILABLE,
  ENVIRONMENT_NOT_FOUND,
} from "../constants/message";
import singletonLogger from "../main/config/Logger";

export const environmentValidator = () => {
  if (!process.env.NODE_ENV) {
    singletonLogger.log({
      level: "error",
      message: ENVIRONMENT_NOT_FOUND,
    });
    process.exit();
  }

  if (!["development", "production", "test"].includes(process.env.NODE_ENV)) {
    singletonLogger.log({
      level: "error",
      message: ENVIRONMENT_IS_NOT_THE_CORRECT_OPTION_AVAILABLE,
    });
    process.exit();
  }
};
