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
    orderplacedPost,
    orderplacedGet,
    razorpayPost,
}=require("../controller/checkout.js")

const{
    wishlistGet,
    wishlistPost,
    wishlistdelete,
}=require("../controller/wishlist.js")
const{
    orderlistGet,
    cancelorder,
    ordersummary,
    reviewGet,
    reviewPost,
}=require("../controller/orderlist.js")
router.get("/user",userGet)
      .get("/productdetails",productdetailsGet)
      .get("/cart",addcartGet)
      .get("/addcart",addcartPost)
      .get("/adress",adressget)
      .post("/adress",adresspost)
      .get("/adressdashboard",adressdashget)
      .delete("/deleteadress",adressdelete)
      .get("/checkout/:productId",checkoutGet)
      .get("/wishlist",wishlistGet)
      .get("/add_wishlist",wishlistPost)
      .delete("/deletewishlist",wishlistdelete)
      .get("/orderplaced",orderplacedGet)
      .post("/codPayment",orderplacedPost)
      .post("/razorpay",razorpayPost)
      .get("/orderlist",orderlistGet)
      .get("/cancelorder/:orderId",cancelorder)
      .get("/ordersummary",ordersummary)
      .get("/review",reviewGet)
      .post("/reviewpost",reviewPost)
module.exports=router;