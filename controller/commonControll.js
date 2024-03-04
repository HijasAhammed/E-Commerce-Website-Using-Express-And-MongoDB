const { render } = require("ejs")
const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer")
const serviceSSID = "VA398ea6be9d1b2106511a6571c1b26515";
const accountSid = "AC35f190f30e889dac4c50a72463495f45";
const authToken = "b026460510a2219130258a70aa0937b9";
const emailOtp=require("../middileware/otp")
const twilio = require("twilio")(accountSid, authToken);
let number;
const signData=require("../models/signupdata")
module.exports={
    loginget:(req,res)=>{
        res.render("login")
    },
    loginpost: async (req,res)=>{
        console.log(req.body)
        const user = await signData.findOne(({ email: req.body.email }));
        if (!user) {
            return res.status(400).send("User not found");
        }
        if (user.password !== req.body.password) {
            return res.status(400).send("Invalid password");
        }
       return res.redirect("/user/user");
    },
    signupget:(req,res)=>{
        res.render("signup")
    },
    signuppost:async (req,res)=>{
        console.log(req.body)
        const{name,last,email,phone,password}=req.body
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,16}$/;
        const emailRegax=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegax.test(email)){
            return res.status(400).send("invalid email adress");
        }
        if(!passwordRegex.test(password)){
            return res.status(400).send("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number");
        }
       const signupSave = await signData.create({
            name,
            last,
            email,
            phone,
            password,
            role:"user",
        })
        if(signupSave){
            number=req.body.phone
        await twilio.verify.v2.services(serviceSSID)
        .verifications.create({
            to: `+91${req.body.phone}`,
            channel: "sms"
        })
        .then((resp) => {
            console.log("response", resp.status);
            return res.redirect('/otpform')
        })
        }
    },
    otpget:(req,res)=>{
        res.render("otpvarification")
    },
 
    otppost:async(req,res)=>{
        // console.log(req.body)
        const {otp}=req.body
        console.log(otp)
        const varifyotp=await twilio.verify.v2.services(serviceSSID)
        .verificationChecks.create({
            to: `+91${number}`,
            code: otp
        })
        if (varifyotp.status==='approved'){
            console.log('verify',varifyotp.status);
            try{
                await signData.updateOne({phone:number},{$set:{verified:true}});
                return res.redirect("/")
            }catch(error){
                console.error("error updating user document",error);
                return res.status(500).send("internal server error");
            }
            // const varifytune=await signData.updateOne({phone:number},{$set:{varified:true}})
           
        }else{
            console.log('otp varification failed')
            return res.stutas(400).send("otp varification failed")
        }
    },
    resetpassGet:async(req,res)=>{
        res.render("resetpassword") 
    },
    resetpassPost: async (req,res)=>{
        const email=req.body.email;
        // console.log(email)
            const user=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"hijasahammedp@gmail.com",
                    pass:"zdkgockmjbjwkpdb",
                }
            });
            const mailOption={
                from:"hijasahammedp@gmail.com",
                to:"hijasahammedp@gmail.com",
                subject:"Sending Email using Node.js",
                text:`your OTP is:${emailOtp.sendOTP}`,
            };
            user.sendMail(mailOption,function (error,info){
                if(error){
                    console.log(error);
                }else{
                    console.log("email send"+info.response);
                    res.redirect(`/resetverify/${email}`)
                }
            })
    },
    resetverifyGet:(req,res)=>{
        const email=req.params.mail;
        // console.log(email)
        res.render("resetpassvarify",{email});

    },
    resetverifyPost:async(req,res)=>{
        try{
            const email=req.params.mail;
            // console.log(email)

            const otp=req.body.otp;

            console.log("Received OTP:", otp);
            const userExist=await signData.findOne({email:email});
            console.log("User Exist:", userExist);
            if(!userExist){
               return res.redirect("/")
            }else if(emailOtp.sendOTP== otp){

                console.log("otp validation ok")
                    res.redirect(`/resetpassword/${email}`)
                }
                else{
                   return res.send("invalid otp")
                }
            }   
            catch (error) {
                console.log("error",error)
                return res.status(500).send("internal server error")
            }
        },
    resetpasswordGet:(req,res)=>{
        const email =req.params.mail;
        console.log(email)
        res.render("resetpass",{email});
    },
    resetpasswordPost:async(req,res)=>{
        try{
            const email =req.params.mail;
            const newpassword=req.body.newpassword;
            const confirmPassword=req.body.confirmPassword;
            if(newpassword !== confirmPassword){
                return res.send("password not match");
            }else{
                const hashedpassword=await bcrypt.hash(newpassword,10);
                await signData.updateOne(
                    {email:email},
                    {$set:{password:newpassword}}
                );
                console.log("New password is",newpassword)
                return res.redirect("/")
            }
        }
        catch(error){
            console.log("error not change in password")
        }
    }   
}