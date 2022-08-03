import express from "express";
import { tagsController } from "../controllers";

const router = express.Router();

router.post("/", tagsController.create);
router.get("/", tagsController.read);
router.get("/:id", tagsController.readById);
router.put("/", tagsController.update);
router.delete("/:id", tagsController.delete);

export { router as TagRouter };
