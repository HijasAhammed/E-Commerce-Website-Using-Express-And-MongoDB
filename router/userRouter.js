const express=require("express")
const router=express.Router();

const{
    userGet,
    productdetailsGet,
}=require('../controller/userControllers')

const{
    addcartGet,
    addcartPost,
}=require("../controller/addcart")
const {
    adressget,
    adresspost,
    adressdashget,
    adressdelete,
}=require("../controller/adress")
const{
    checkoutGet,
}=require("../controller/checkout.js")

const{
    wishlistGet,
}=require("../controller/wishlist.js")

router.get("/user",userGet)
      .get("/productdetails",productdetailsGet)
      .get("/cart",addcartGet)
      .get("/addcart",addcartPost)
      .get("/adress",adressget)
      .post("/adress",adresspost)
      .get("/adressdashboard",adressdashget)
      .delete("/deleteadress",adressdelete)
      .get("/checkout",checkoutGet)
      .get("/wishlist",wishlistGet)

     
module.exports=router;