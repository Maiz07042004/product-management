const Account=require("../../models/account.model")
const systemConfig=require("../../config/system")

module.exports.requireAuth=async(req,res,next)=>{
    if(req.cookies.token){
        const user=Account.findOne({token:req.cookies.token})
        if(user){
            next();
        } else{
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }
    } else{
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
}