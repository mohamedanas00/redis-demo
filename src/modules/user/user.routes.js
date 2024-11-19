import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import * as userController from "./controller/user.js";
import Redis from "redis";
const router = Router();
const client = Redis.createClient();
// Connect to Redis
client.connect();

// Handle Redis connection errors
client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

router.post("/", userController.addUser);

router.get("/:email", userController.getUserByEmail);

router.get("/with-cache/:email", userController.getUserWithCache);

export default router;
