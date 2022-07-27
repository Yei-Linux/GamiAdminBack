export interface DatabaseStrategy<T, U, EntityType> {
  entities: Record<string, EntityType>;
  connect: (url: string, options: Record<string, unknown>) => T;
  runSchemas: () => void;
  runMigrations: (migrations: U) => void;
}

export type TMongooseConnection = void;
export type TMongooseMigrations = Record<string, Array<Record<string, any>>>;
export type TDatabaseConnection = TMongooseConnection;
export type TDatabaseMigrations = TMongooseMigrations;
