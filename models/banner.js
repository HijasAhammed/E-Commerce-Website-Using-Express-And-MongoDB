const mongoose=require("mongoose")
const bannerschema=new mongoose.Schema({
    BannerName:{
        type:String,
        required:true,
    },
    Image:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true,
    },
    Offer:{
        type:String,
        required:true,
    },
    Startdate:{
        type:Date,
        required:true,
    },
    Enddate:{
        type:Date,
        required:true,
    },
})
module.exports=mongoose.model("banner",bannerschema)