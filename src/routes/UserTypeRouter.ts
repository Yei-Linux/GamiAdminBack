import express from "express";
import { userTypeController } from "../controllers";

const router = express.Router();

router.post("/", userTypeController.create);
router.get("/", userTypeController.read);
router.get("/:id", userTypeController.readById);
router.put("/", userTypeController.update);
router.delete("/:id", userTypeController.delete);

export { router as UserTypeRouter };
