import { mongoMigrateCli } from "mongo-migrate-ts";

mongoMigrateCli({
  uri: "mongodb://jesus:123@127.0.0.1:27017",
  database: "gami_admin",
  migrationsDir: __dirname,
  migrationsCollection: "changelog_migration",
});
