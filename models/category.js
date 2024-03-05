const mongoose=require("mongoose")
const adminschema=new mongoose.Schema({
    categories:{
        type:String,
        required:true
    },
})
module.exports=mongoose.model("category",adminschema)