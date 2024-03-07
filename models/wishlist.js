const mongoose=require("mongoose")
const wishlist = require("../controller/wishlist")

const wishlistSchema=new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
    items:[{
        productID:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'addproducts'},
    }],
    createdOn:{type:Date,default:Date.now}
})
const wishlistmodel=mongoose.model("wishlist",wishlistSchema)
module.exports=wishlistmodel