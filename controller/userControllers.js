const banner=require("../models/banner")
const products=require("../models/addproduct")
module.exports={
    userGet: async (req,res)=>{
        const bannerscheme= await banner.find()
        const addproducts= await products.find()
       res.render("userside/userhome",{bannerscheme,addproducts})
    },
    productdetailsGet: async (req,res)=>{
        const data=req.query.id
        // console.log(data)  
        const showproducts= await products.findOne({_id:data})
        // console.log(showproducts)
        res.render("userside/productdetails",{showproducts})
    }
}