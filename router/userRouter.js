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
}=require("../controller/adress")

router.get("/user",userGet)
      .get("/productdetails",productdetailsGet)
      .get("/cart",addcartGet)
      .get("/addcart",addcartPost)
      .get("/adress",adressget)
      .post("/adress",adresspost)
      .get("/adressdashboard",adressdashget)

     
module.exports=router;