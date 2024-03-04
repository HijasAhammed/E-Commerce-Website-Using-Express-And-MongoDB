const mongoose=require("mongoose")
const productschema= new mongoose.Schema({
    ProductName:{
        type:String,
        required:true,
    },
    Category:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    },
    Quantity:{
        type:Number,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    productimg:{
        type:Array     
    }
})
productmodel =mongoose.model("addproduct",productschema)
module.exports=productmodel