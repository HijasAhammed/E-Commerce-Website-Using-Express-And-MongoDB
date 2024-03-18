const addressSchema=require("../models/adress")
const productdetails=require("../models/addproduct")
module.exports={
    checkoutGet: async (req,res)=>{
        if(req.session.user_id){
            try{
                const product=req.params.productId
                const productData=await productdetails.findOne({_id:product})
                const addresscheck=await addressSchema.find()
                res.render("userside/checkout",{addresscheck:addresscheck,data:productData})
            }catch(error){
                console.log(error)
            }
        }else{
            res.redirect("/")
        }
    },
    orderplacedGet:(req,res)=>{
        res.render("userside/orderplaced")
    }
}