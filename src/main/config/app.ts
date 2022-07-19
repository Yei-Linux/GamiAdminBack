import express from "express";
import { config as dotenvConfig } from "dotenv";
import { executeDB } from "./database";

const app = express();
dotenvConfig({
  path: "./src/main/environments/.env.development",
});
executeDB();

export default app;
