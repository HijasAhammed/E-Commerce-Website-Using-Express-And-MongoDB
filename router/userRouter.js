const express=require("express")
const router=express.Router();

const{
    userGet,
    productdetailsGet
}=require('../controller/userControllers')


router.get("/user",userGet)
      .get("/productdetails",productdetailsGet)


module.exports=router;