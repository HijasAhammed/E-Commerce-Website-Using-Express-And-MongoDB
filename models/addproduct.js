const mongoose=require("mongoose")

const productschema= new mongoose.Schema({
    ProductName:{
        type:String,
        required:false,
    },
    Category:{
        type:String,
        required:false,
    },
    Price:{
        type:Number,
        required:false,
    },
    Quantity:{
        type:Number,
        required:false,
    },
    DeliveryDate:{
        type:Number,
        required:false,
    },
    Description:{
        type:String,
        required:false,
    },
    productimg:{
        type:Array
       
    }

})

productmodel =mongoose.model("addproduct",productschema)

module.exports=productmodel