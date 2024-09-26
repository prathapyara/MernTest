import express from "express";
import { getUser,udpateUser } from "../controller/getuser.js";

const router=express.Router();

router.get("/user/",getUser);
router.put("/user/:id",udpateUser);

export default router;