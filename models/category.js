const mongoose=require("mongoose")

const adminschema=new mongoose.Schema({
    
    categories:{
        type:String,
    },
    Description:{
        type:String,
    }
})
module.exports=mongoose.model("category",adminschema)