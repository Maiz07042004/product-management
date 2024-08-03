const md5=require("md5")
const Account=require("../../models/account.model")
const Role=require("../../models/role.model")
const systemConfig=require("../../config/system")


// [GET]/adnin/accounts
module.exports.index=async(req,res)=>{
    let find={
        deleted:false
    };
    const records=await Account.find(find).select("-password -token")
    for(const record of records){
        const role=await Role.findOne({
            _id:record.role_id,
            deleted:false
        })
        record.role=role
    }
    res.render("admin/pages/accounts/index",{
        pageTitle: "Tài khoản",
        records:records
    })
}

// [GET]/adnin/accounts/create
module.exports.create=async(req,res)=>{
    let find={
        deleted:false
    }
    const roles=await Role.find(find)
    res.render("admin/pages/accounts/create",{
        pageTitle: "Tạo tài khoản",
        roles:roles
    })
}

// [POST]/adnin/accounts/create
module.exports.createPost=async(req,res)=>{
    const emailExist=await Account.findOne({
        email:req.body.email,
        deleted:false
    })
    if(emailExist){
        req.flash("error",`Email ${req.body.email} đã tồn tại`)
        res.redirect("back")
    } else{
        req.body.password=md5(req.body.password)
        const record=new Account(req.body)
        await record.save()
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

// [GET]/adnin/accounts/edit/:id
module.exports.edit=async(req,res)=>{
    try {
        let find={
            deleted:false
        }
        const data=await Account.findOne({
            _id:req.params.id,
            deleted:false
        })
        const roles=await Role.find(find)
        res.render("admin/pages/accounts/edit",{
            pageTitle: "Tạo tài khoản",
            roles:roles,
            data:data
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

// [GET]/adnin/accounts/edit/:id
module.exports.editPatch=async(req,res)=>{
    try {
        const emailExist=await Account.findOne({
            _id: {$ne:req.params.id},
            email:req.body.email,
            deleted:false
        })
        if(emailExist){
            req.flash("error",`Email ${req.body.email} đã tồn tại`)
        } else{
            if(req.body.password){
                req.body.password=md5(req.body.password)
            } else{
                delete req.body.password
            }
            await Account.updateOne({_id:req.params.id},req.body)
            req.flash("success","Cập nhật tài khoản thành công")
        }
        res.redirect("back")
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}