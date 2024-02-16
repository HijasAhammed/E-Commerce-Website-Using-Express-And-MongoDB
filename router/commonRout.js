const express=require("express")
const router=express.Router()

const{
    loginget,
    loginpost,
    signupget,
    signuppost,
    otpget,
    otppost,
    userget,
    resetpassGet,
    resetpassPost,
    resetverifyGet,
    resetverifyPost,
    resetpasswordGet,
    resetpasswordPost,
}=require("../controller/commonControll")


router.get("/",loginget)
      .post("/",loginpost)
      .get("/signup",signupget)
      .post("/signup",signuppost)
      .get("/otpform",otpget)
      .post("/otpform",otppost)
      .get("/user",userget)
      .get("/resetpass",resetpassGet)
      .post("/resetpass",resetpassPost)
      .get("/resetverify/:mail",resetverifyGet)
      .post("/resetverify/:mail",resetverifyPost)
      .get("/resetpassword/:mail",resetpasswordGet)
      .post("/resetpassword/:mail",resetpasswordPost)
      


module.exports=router