import { TMongooseMigrations } from "../main/config/database/types";
import { tagEntity } from "./tagEntity";
import { userTypeEntity } from "./userTypeEntity";

export const migrations: TMongooseMigrations = {
  userTypeEntity,
  tagEntity,
};
