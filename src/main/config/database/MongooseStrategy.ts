import mongoose from "mongoose";
import { DatabaseStrategy, TMongooseConnection } from "./types";

class MongooseStrategy implements DatabaseStrategy<TMongooseConnection> {
  connect(url: string, options: Record<string, unknown>): TMongooseConnection {
    try {
      const connection = mongoose.connect(url, options);

      return connection;
    } catch (error) {
      throw new Error("Failed on stablish connection!");
    }
  }
}

export default MongooseStrategy;
