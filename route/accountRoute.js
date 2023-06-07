import { addAccount } from "../controller/accountController.js";
import express from "express"

const userRouter = express.Router();


userRouter.post("/add",addAccount);

export default userRouter;