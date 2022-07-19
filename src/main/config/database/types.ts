import mongoose from "mongoose";

export interface DatabaseStrategy<T> {
  connect: (url: string, options: Record<string, unknown>) => T;
}

export type TMongooseConnection = void;
export type TDatabaseConnection = TMongooseConnection;