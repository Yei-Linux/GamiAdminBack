import singletonLogger from "../Logger";
import { DatabaseConfig } from "./config";
import MongooseStrategy from "./MongooseStrategy";
import { DatabaseStrategy, TDatabaseConnection } from "./types";

class Context<T> {
  private strategy: DatabaseStrategy<TDatabaseConnection> | null = null;

  setStrategy(databaseStrategy: DatabaseStrategy<TDatabaseConnection>) {
    this.strategy = databaseStrategy;
  }

  async executeStrategy(
    url: string,
    options: Record<string, unknown>
  ): Promise<T | undefined> {
    try {
      if (!this.strategy) return;
      await this.strategy.connect(url, options);
      this.strategy.runSchemas();
    } catch (error) {
      singletonLogger.log({
        level: "error",
        message: `Failed on stablish connection`,
      });
    }
  }
}

export const executeDB = () => {
  const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
  } = process.env;

  const { url, options } = DatabaseConfig({
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dbname: DATABASE_NAME,
  });

  const databaseContext = new Context<TDatabaseConnection>();
  databaseContext.setStrategy(new MongooseStrategy());
  databaseContext.executeStrategy(url, options);
};
