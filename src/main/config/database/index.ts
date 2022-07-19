import { DatabaseConfig } from "./config";
import MongooseStrategy from "./MongooseStrategy";
import { DatabaseStrategy, TDatabaseConnection } from "./types";

class Context<T> {
  private strategy: DatabaseStrategy<TDatabaseConnection>;

  setStrategy(databaseStrategy: DatabaseStrategy<TDatabaseConnection>) {
    this.strategy = databaseStrategy;
  }

  executeStrategy(
    url: string,
    options: Record<string, unknown>
  ): T | undefined {
    if (!this.strategy) return;
    this.strategy.connect(url, options);
  }
}

export const executeDB = () => {
  const databaseContext = new Context<TDatabaseConnection>();
  databaseContext.setStrategy(new MongooseStrategy());
  databaseContext.executeStrategy(DatabaseConfig.url, DatabaseConfig.options);
};
