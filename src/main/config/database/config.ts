export interface IDBConfig {
  username?: string;
  password?: string;
  host?: string;
  port?: string;
  dbname?: string;
}

export const DatabaseConfig = ({
  username,
  password,
  host,
  port,
  dbname,
}: IDBConfig) => ({
  options: {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    dbName: dbname,
  },
  url: `mongodb://${username}:${password}@${host}:${port}`,
  config: {
    enableSchemasUpdated: true,
    enableMigrations: false,
  },
});
