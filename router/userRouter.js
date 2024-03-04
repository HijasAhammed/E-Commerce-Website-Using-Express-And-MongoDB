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

router.get("/user",userGet)
      .get("/productdetails",productdetailsGet)
      .get("/addcart",addcartGet)
      .post("/addcart",addcartPost)


module.exports=router;