const mongoose=require("mongoose")
const ordersdata=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId
    },
    products:[{
        id:{type:mongoose.Schema.Types.ObjectId,
        ref:"addproducts"},
        quantity:{
            type:Number,
            default:1
        }
        }],
        TotalPrice:{
            type:Number
        },
        PaymentMethod:{
        type:String,
    },
        status:{
            type:String,
            default:'pending'
        },
})
module.exports=mongoose.model("orders",ordersdata)