const express=require("express")
const router=express.Router()
const{ upload,uploadFolder}=require('../middileware/multer')


const {
    admindash,
    userdetailsGet,
    userdetailsPost
}=require("../controller/admincontroller")

const{
    categoryGet,
    categoryPost,
    deletecategory,
}=require("../controller/category") 

const{
    addproductGet,
    addproductPost,
    editproductGet,
    deleteproduct,
    editprPost,
    editprGet,
}=require("../controller/addproduct")

const{
    bannerGet,
    bannerPost,
    addbannerGet,
    addbannerPost,
    addbannerDelete,
}=require("../controller/banner")




router.get("/admindash",admindash)
      .get("/addproduct", addproductGet)
      .post("/addproduct",uploadFolder('asset'),upload.array('productimg',10),addproductPost)
      .get("/editproduct",editproductGet)
      .get("/userdetails",userdetailsGet)
      .post("/userdetails",userdetailsPost)
      .get("/category",categoryGet)
      .post("/category",categoryPost)
      .delete("/deletecategory",deletecategory)
      .delete("/deleteproduct",deleteproduct)
      .get("/editpr/:id",editprGet)
      .post("/editpr/:id",uploadFolder('asset'),upload.array('productimg',10),editprPost)
      .get("/banner",bannerGet)
      .post("/banner",bannerPost)
      .get("/addbanner",addbannerGet)
      .post("/addbanner",uploadFolder('banner'),upload.single('Image'),addbannerPost)
      .delete("/deletebanner",addbannerDelete,)
module.exports=router
