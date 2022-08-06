import mongoose from "mongoose";
import { catchError } from "../../../decorators";
import {
  externalPostEntity,
  postEntity,
  snippetEntity,
  tagEntity,
  userEntity,
  userTypeEntity,
} from "../../../entities";
import MongooseEntity from "../../../pojos/MongooseEntity";
import singletonLogger from "../Logger";
import {
  DatabaseStrategy,
  TMongooseConnection,
  TMongooseMigrations,
} from "./types";

class MongooseStrategy
  implements
    DatabaseStrategy<TMongooseConnection, TMongooseMigrations, MongooseEntity>
{
  entities: Record<string, MongooseEntity> = {};

  @catchError("Failed on stablish connection to mongodb!")
  async connect(
    url: string,
    options: Record<string, unknown>
  ): Promise<TMongooseConnection> {
    await mongoose.connect(url, options);

    singletonLogger.log({
      level: "info",
      message: `Connection done succesfull!`,
    });
  }

  runSchemas() {
    try {
      this.entities = {
        userTypeEntity: userTypeEntity,
        userEntity: userEntity,
        tagEntity: tagEntity,
        snippetEntity: snippetEntity,
        postEntity: postEntity,
        externalPostEntity: externalPostEntity,
      };
    } catch (error) {
      this.entities = {};
      throw new Error("Failed creating schemas");
    }
  }

  @catchError("Failed running migrations")
  async runMigrations(migrations: TMongooseMigrations) {
    for (const [key, entity] of Object.entries(this.entities)) {
      const migrationFound = migrations?.[key];
      if (!migrationFound) continue;
      const dataAdded = await entity?.updateMany(migrationFound);
    }

    singletonLogger.log({
      level: "info",
      message: `Migrations executed successfull!`,
    });
  }
}

export default MongooseStrategy;
