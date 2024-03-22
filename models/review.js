const mongoose=require("mongoose")
const reviewschema= new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addproducts",
        required:true},
    review:[{
        UserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'data'},
    comment:{
        type:String
    }  
}]
 })
 module.exports=mongoose.model("review",reviewschema)