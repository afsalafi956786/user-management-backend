import mongoose from "mongoose";


const userShema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    gender:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    }
    
},{
    timestamps:true,
})

const userModel=mongoose.model('user',userShema);
export default userModel;