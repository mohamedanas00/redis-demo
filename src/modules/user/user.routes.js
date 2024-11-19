import { Router } from "express";
import * as userController from "./controller/user.js";

const router = Router();

router.post("/", userController.addUser);

router.get("/:email", userController.getUserByEmail);

router.get("/with-cache/:email", userController.getUserWithCache);

export default router;
