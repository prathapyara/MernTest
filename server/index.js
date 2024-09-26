import express from "express";
import cors from "cors"
import { mongodb } from "./DB/config.js";
import dotenv from "dotenv";
import router from "./routes/useroute.js";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api",router);

mongodb();

const PORT= process.env.PORT;

app.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}` )
})