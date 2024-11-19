import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connection.js";
dotenv.config();

const app = express();
const port = +process.env.PORT ;    

app.listen(port, () => console.log("Server is running on port 3000"));
connectDB()


