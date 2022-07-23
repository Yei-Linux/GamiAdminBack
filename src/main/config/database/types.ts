import Entity from "../../../pojos/Entity";

export interface DatabaseStrategy<T, U> {
  entities: Record<string, Entity>;
  connect: (url: string, options: Record<string, unknown>) => T;
  runSchemas: () => void;
  runMigrations: (migrations: U) => void;
}

export type TMongooseConnection = void;
export type TMongooseMigrations = Record<string, Array<Record<string, any>>>;
export type TDatabaseConnection = TMongooseConnection;
export type TDatabaseMigrations = TMongooseMigrations;
