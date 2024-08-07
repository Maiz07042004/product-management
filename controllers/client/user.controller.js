const md5=require("md5")
const User=require("../../models/user.model")
const Cart=require("../../models/cart.model")
const ForgotPassWord=require("../../models/forgot-password.model")
const generateHelper=require("../../helpers/generate")
const sendMailHelper=require("../../helpers/sendMail")

// [GET]/user/register
module.exports.register=(req,res)=>{
    res.render("client/pages/user/register",{
        pageTitle:"Đăng ký tài khoản"
    })
}

// [POST]/user/register
module.exports.registerPost=async(req,res)=>{
    const existEmail= await User.findOne({
        email:req.body.email,
        deleted:false
    })
    if(existEmail){
        req.flash("error","Email đã tồn tại");
        res.redirect("back")
        return;
    }
    req.body.password=md5(req.body.password)
    const user=new User(req.body)
    user.save()
    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/")
}

// [GET]/user/login
module.exports.login=(req,res)=>{
    res.render("client/pages/user/login",{
        pageTitle:"Trang đăng nhập"
    })
}

// [POST]/user/login
module.exports.loginPost=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        req.flash("error","Không tìm thấy email")
        res.redirect("back")
        return;
    }
    if(user.password!==md5(password)){
        req.flash("error","Nhập sai mật khẩu")
        res.redirect("back");
        return;
    }
    if(user.status==="inactive"){
        req.flash("error","Tài khoản đã bị khoá");
        res.redirect("back");
        return;
    }
    res.cookie("tokenUser",user.tokenUser)
    await Cart.updateOne({
        _id:req.cookies.cartId
    },{
        user_id:user.id
    })
    res.redirect("/")
}

// [GET]/user/logout
module.exports.logout=(req,res)=>{
    res.clearCookie("tokenUser");
    res.redirect("/")
}

// [GET]/user/password/forgot
module.exports.forgotPassword=(req,res)=>{
    res.render("client/pages/user/forgot-password",{
        pageTitle:"Quên mật khẩu"
    })
}

// [POST]/user/password/forgot
module.exports.forgotPasswordPost=async(req,res)=>{
    const email=req.body.email
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        req.flash("error","Không tìm thấy email")
        res.redirect("back");
        return;
    }

    // Việc 1: Tạo mã OTP và lưu OTP,email vào collection forgot-password
    const otp=generateHelper.generateRandomNumber(6)
    const objectForgotPassword={
        email: user.email,
        otp:otp,
        expireAt:new Date()
    }
    const forgotPassword=new ForgotPassWord(objectForgotPassword)
    await forgotPassword.save()
    // Việc 2: Gửi mã OTP qua email của user
    const subject="Mã OTP xác nhận lấy lại mật khẩu"
    const content=`Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3'. Lưu ý không được để lộ mã OTP`
    sendMailHelper.sendMail(email,subject,content)
    res.redirect(`/user/password/otp?email=${email}`)
}

// [GET]/user/password/otp
module.exports.otpPassword=async(req,res)=>{
    const email=req.query.email;
    res.render("client/pages/user/otp-password",{
        pageTitle:"OTP",
        email:email
    })
}

// [POST]/user/password/otp
module.exports.otpPasswordPost=async(req,res)=>{
    const email=req.body.email;
    const otp=req.body.otp;
    const result=await ForgotPassWord.findOne({
        email:email,
        otp:otp
    })
    if(!result){
        req.flash("error","Mã OTP không đúng");
        res.redirect("back");
        return;
    }
    const user=await User.findOne({
        email:email
    })
    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/user/password/reset")
}

// [GET]/user/password/reset
module.exports.resetPassword=(req,res)=>{
    res.render("client/pages/user/reset-password",{
        pageTitle:"Mật khẩu mới"
    })
}

// [POST]/user/password/reset
module.exports.resetPasswordPost=async(req,res)=>{
    const password=req.body.password;
    await User.updateOne({
        tokenUser:req.cookies.tokenUser
    },{password:md5(password)})
    res.redirect("/user/login")
}

// [GET]/user/info
module.exports.info=(req,res)=>{
    res.render("client/pages/user/info",{
        pageTitle:"Thông tin cá nhân"
    })
}