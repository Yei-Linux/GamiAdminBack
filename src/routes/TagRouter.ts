import express from "express";
import { tagsController } from "../controllers";

const router = express.Router();

router.post("/", tagsController.create);

export { router as TagRouter };
