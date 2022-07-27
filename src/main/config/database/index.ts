import { migrations } from "../../../initial-data";
import MongooseEntity from "../../../pojos/MongooseEntity";
import singletonLogger from "../Logger";
import { DatabaseConfig } from "./config";
import MongooseStrategy from "./MongooseStrategy";
import {
  DatabaseStrategy,
  TDatabaseConnection,
  TDatabaseMigrations,
} from "./types";

class Context<T> {
  private _strategy: DatabaseStrategy<
    TDatabaseConnection,
    TDatabaseMigrations,
    MongooseEntity
  > | null = null;

  setStrategy(
    databaseStrategy: DatabaseStrategy<
      TDatabaseConnection,
      TDatabaseMigrations,
      MongooseEntity
    >
  ) {
    this._strategy = databaseStrategy;
  }

  get strategy() {
    return this._strategy;
  }

  async executeStrategy(
    url: string,
    options: Record<string, unknown>,
    { enableSchemasUpdated, enableMigrations }: Record<string, boolean>
  ): Promise<T | undefined> {
    try {
      if (!this._strategy) return;
      await this._strategy.connect(url, options);
      if (enableSchemasUpdated) {
        this._strategy.runSchemas();
      }
      if (enableMigrations) {
        await this._strategy.runMigrations(migrations);
      }
    } catch (error) {
      singletonLogger.log({
        level: "error",
        message: `${error}`,
      });
    }
  }
}

export const executeDB = async () => {
  const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
  } = process.env;

  const { url, options, config } = DatabaseConfig({
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dbname: DATABASE_NAME,
  });

  const databaseContext = new Context<TDatabaseConnection>();
  databaseContext.setStrategy(new MongooseStrategy());
  await databaseContext.executeStrategy(url, options, config);

  const globalEntities = databaseContext.strategy?.entities;

  return { globalEntities };
};
