import { timeStamp } from "console";
import mongoose from "mongoose";

const msgSchema=  new mongoose.Schema({
    senderId: {
        type:String,
        required: true
    },
    receiverId:{
        type:String,
        required: true
    },
    text:{
        type:String,
        required: true
    },
    timeStamp:{
        type:Date,
        default: Date.now
    }
});
export default mongoose.model("Message", msgSchema);