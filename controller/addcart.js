const addcart=require("../models/addcart.js")
module.exports={
    addcartGet: async (req,res)=>{
        const cartdata= await addcart.find()
               res.render("userside/addToCart",{cartdata})
    },
    addcartPost:(req,res)=>{
        
    }
}