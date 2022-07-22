import mongoose from "mongoose";
import {
  buildExternalPostEntity,
  buildPostEntity,
  buildSnippetEntity,
  buildTagEntity,
  buildUserEntity,
  buildUserTypeEntity,
} from "../../../entities";
import singletonLogger from "../Logger";
import { DatabaseStrategy, TMongooseConnection } from "./types";

class MongooseStrategy implements DatabaseStrategy<TMongooseConnection> {
  async connect(
    url: string,
    options: Record<string, unknown>
  ): Promise<TMongooseConnection> {
    try {
      await mongoose.connect(url, options);
    } catch (error) {
      singletonLogger.log({
        level: "warn",
        message: url + " " + error,
      });
      throw new Error("Failed on stablish connection to mongodb!");
    }
  }

  runSchemas() {
    try {
      const userTypeEntity = buildUserTypeEntity();
      const userEntity = buildUserEntity(userTypeEntity);
      const tagEntity = buildTagEntity();
      const snippetEntity = buildSnippetEntity();
      const postEntity = buildPostEntity(userEntity, tagEntity, snippetEntity);
      const externalPostEntity = buildExternalPostEntity(tagEntity);

      singletonLogger.log({
        level: "info",
        message: "Schemas updated!",
      });
    } catch (error) {
      singletonLogger.log({
        level: "warn",
        message: `Error on run schemas: ${error}`,
      });
    }
  }
}

export default MongooseStrategy;
