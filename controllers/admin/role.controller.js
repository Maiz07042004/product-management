const Role = require("../../models/role.model")
const systemConfig=require("../../config/system")
const flash = require("express-flash")

// [GET]/admin/roles
module.exports.index=async(req,res)=>{
    const find={
        deleted:false
    }
    const records=await Role.find(find)
    res.render("admin/pages/roles/index.pug",{
        records:records
    })
}

// [GET]/admin/roles/create
module.exports.create=async(req,res)=>{
    res.render("admin/pages/roles/create")
}

//[POST]/admin/roles/create
module.exports.createPost=async(req,res)=>{
    try {
        const role=new Role(req.body)
        await role.save();
    } catch (error) {
        
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`)

}

// [GET]/admin/roles/edit/:id
module.exports.edit=async(req,res)=>{
    try {
        const data=await Role.findOne({_id:req.params.id})
        res.render("admin/pages/roles/edit",{
            data:data
        })
    } catch (error) {
        
    }
}

// [PATCH]/admin/roles/edit/:id
module.exports.editPatch=async(req,res)=>{
    try {
        console.log(req.params.id)
        await Role.updateOne({_id:req.params.id}, req.body)
        req.flash("success","Cập nhật sản phẩm thành công")
    } catch (error) {
        req.flash("error","Cập nhật sản phẩm thất bại")
    }
    res.redirect("back")
}

// [DELETE]/admin/roles/delete/:id
module.exports.delete=async(req,res)=>{
    try {
        await Role.updateOne({_id:req.params.id},{deleted:true})
        req.flash("success","Xoá sản phẩm thành công")
    } catch (error) {
        req.flash("error","Xoá sản phẩm thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET]/admin/roles/detail/:id
module.exports.detail=async(req,res)=>{
    try {
        const data=await Role.findOne({_id:req.params.id})
        res.render("admin/pages/roles/detail.pug",{
            data:data
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
        req.flash("error","Lỗi")
    }
}

// [GET]/admin/roles/permissions
module.exports.permissions=async(req,res)=>{
    try {
        let find={
            deleted:false
        }
        const records=await Role.find(find)
        res.render("admin/pages/roles/permissions.pug",{
            records:records
        })
    } catch (error) {
        req.flash("error","Lỗi")
    }
}

// [GET]admin/roles/permissions
module.exports.permissionsPatch=async(req,res)=>{
    try {
        const permissions=JSON.parse(req.body.permissions)
        for (const item of permissions) {
            await Role.updateOne({_id:item.id},{permissions:item.permissions})
        }
    } catch (error) {
        req.flash("error","Lỗi")
    }
    res.redirect("back")
}