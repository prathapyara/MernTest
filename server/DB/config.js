import mongoose, { Model } from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const mongodb=async()=>{
    try{
        await mongoose.connect(process.env.URL);
        console.log("connecte to db successfully")
    }catch(err){
        console.log("falied to connect")
    }  
};

const schema=new mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        password: {
            type:String,
            require:true
        },
        city:  {
            type:String,
            require:true
        },
        DOB: {
            type:Date,
            require:true
        }
    })

export const user=new mongoose.model("user",schema);

