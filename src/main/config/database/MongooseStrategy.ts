import mongoose from "mongoose";
import {
  buildExternalPostEntity,
  buildPostEntity,
  buildSnippetEntity,
  buildTagEntity,
  buildUserEntity,
  buildUserTypeEntity,
} from "../../../entities";
import Entity from "../../../pojos/Entity";
import singletonLogger from "../Logger";
import {
  DatabaseStrategy,
  TMongooseConnection,
  TMongooseMigrations,
} from "./types";

class MongooseStrategy
  implements DatabaseStrategy<TMongooseConnection, TMongooseMigrations>
{
  entities: Record<string, Entity> = {};

  async connect(
    url: string,
    options: Record<string, unknown>
  ): Promise<TMongooseConnection> {
    try {
      await mongoose.connect(url, options);

      singletonLogger.log({
        level: "info",
        message: `Connection done succesfull!`,
      });
    } catch (error) {
      throw new Error("Failed on stablish connection to mongodb!");
    }
  }

  runSchemas() {
    try {
      const userTypeEntity = buildUserTypeEntity();
      const userEntity = buildUserEntity(userTypeEntity.EntityDB);
      const tagEntity = buildTagEntity();
      const snippetEntity = buildSnippetEntity();
      const postEntity = buildPostEntity(
        userEntity.EntityDB,
        tagEntity.EntityDB,
        snippetEntity.EntityDB
      );
      const externalPostEntity = buildExternalPostEntity(tagEntity.EntityDB);

      singletonLogger.log({
        level: "info",
        message: "Schemas updated!",
      });

      this.entities = {
        userTypeEntity,
        userEntity,
        tagEntity,
        snippetEntity,
        postEntity,
        externalPostEntity,
      };
    } catch (error) {
      this.entities = {};
      throw new Error("Failed creating schemas");
    }
  }

  async runMigrations(migrations: TMongooseMigrations) {
    try {
      for (const [key, entity] of Object.entries(this.entities)) {
        const migrationFound = migrations?.[key];
        if (!migrationFound) continue;
        const dataAdded = await entity?.updateMany(migrationFound);
      }

      singletonLogger.log({
        level: "info",
        message: `Migrations executed successfull!`,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed running migrations");
    }
  }
}

export default MongooseStrategy;
