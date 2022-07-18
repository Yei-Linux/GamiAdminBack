import mongoose from "mongoose";

export interface DatabaseStrategy<T> {
  connect: (url: string, options: Record<string, unknown>) => T;
}

export type TMongooseConnection = Promise<typeof mongoose>;
export type TDatabaseConnection = TMongooseConnection;
