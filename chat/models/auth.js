import mongoose from "mongoose";

const authSchema= new mongoose.Schema({
    phone:{
        type:String,
        required :true,
        unique:true,
        minlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:5
    }
});

export default mongoose.model("AuthDetails", authSchema);