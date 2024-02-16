const mongoose=require("mongoose")

const signData=new mongoose.Schema({
    name:String,
    last:String,
    email:String,
    phone:Number,
    password:String,
    role:String,
    verified:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model("data",signData)