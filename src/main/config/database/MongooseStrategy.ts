import mongoose from "mongoose";
import { DatabaseStrategy, TMongooseConnection } from "./types";

class MongooseStrategy implements DatabaseStrategy<TMongooseConnection> {
  connect(url: string, options: Record<string, unknown>): TMongooseConnection {
    try {
      mongoose.connect(url, options);
    } catch (error) {
      throw new Error("Failed on stablish connection!");
    }
  }
}

export default MongooseStrategy;
