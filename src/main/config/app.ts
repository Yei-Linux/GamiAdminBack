import express from "express";
import { config as dotenvConfig } from "dotenv";

const app = express();
dotenvConfig({
  path: "./src/main/environments/.env.development",
});

export default app;
