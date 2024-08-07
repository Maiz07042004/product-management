const User=require("../../models/user.model")

module.exports.requireAuth=async(req,res,next)=>{
    if(req.cookies.tokenUser){
        const user=await User.findOne({tokenUser:req.cookies.tokenUser}).select("-password")
        if(user){
            next();
        } else{
            res.redirect(`/user/login`)
            return
        }
    } else{
        res.redirect(`/user/login`)
        return
    }
}