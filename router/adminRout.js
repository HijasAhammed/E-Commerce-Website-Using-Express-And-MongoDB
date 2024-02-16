const express=require("express")
const router=express.Router()

const {
    admindash,
    admindashPost,
    addproductGet,
    addproductPost,
    editproductGet,
    editproductPost,
    // deleteproduct,
    userdetailsGet,
    userdetailsPost
}=require("../controller/admincontroller")

const{
    categoryGet,
}=require("../controller/category")


router.get("/admindash",admindash)
      .post("/admindash",admindashPost)
      .get("/addproduct",addproductGet)
      .post("/addproduct",addproductPost)
      .get("/editproduct",editproductGet)
      .post("/editproduct",editproductPost)
      .get("/userdetails",userdetailsGet)
      .post("/userdetails",userdetailsPost)
      .get("/category",categoryGet)
module.exports=router
