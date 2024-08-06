const md5=require("md5")
const User=require("../../models/user.model")

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
    res.redirect("/")
}