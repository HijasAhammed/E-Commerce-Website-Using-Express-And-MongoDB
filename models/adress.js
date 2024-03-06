const mongoose=require("mongoose")
const adressSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Locality:{
        type:String,
        required:true,
    },
    Country:{
        type:String,
        required:true,
    },
    District:{
        type:String,
        required:true,
    },
    State:{
        type:String,
        required:true,
    },
    City:{
        type:String,
        required:true,
    },
    HouseName:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("adress",adressSchema)