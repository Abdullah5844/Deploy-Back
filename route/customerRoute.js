import { signin } from "../controller/customerController.js";
import express from "express"

const userRouter = express.Router();

userRouter.post("/signin",signin);

export default userRouter;