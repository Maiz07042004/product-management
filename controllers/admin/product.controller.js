const Product=require("../../models/product.model")
const filterStatusHelpers=require("../../helpers/filterStatus")
const searchHelpers=require("../../helpers/search")
const objectPaginationHelpers=require("../../helpers/pagination")
const systemConfig=require("../../config/system")
const flash = require("express-flash")
// [GET]/admin/products
module.exports.index=async(req,res)=>{
    // console.log(req.query.status)
    const filterStatus=filterStatusHelpers(req.query)

    let find={
        deleted:false
    }

    if(req.query.status){
        find.status=req.query.status
    }
    const objectSearch=searchHelpers(req.query)
    if(objectSearch.regex){
        find.title=objectSearch.regex
    }


    const countProducts=await Product.countDocuments(find)
    let objectPagination=objectPaginationHelpers(
        {
        currenPage:1,
        limitItem:4},
        req.query,
        countProducts
    )



    const Products= await Product.find(find).sort({position:"desc"}).limit(objectPagination.limitItem).skip(objectPagination.skip)
    res.render("admin/pages/products/index.pug",{
        pageTitle:"Danh sách sản phẩm",
        Products:Products,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword,
        objectPagination:objectPagination
    }
    )
}
// [PATCH]///change-status/:status/:id
module.exports.changeStatus=async(req,res)=>{

    const status=req.params.status;
    const id=req.params.id
    await Product.updateOne({_id: id},{status: status});
    req.flash("success","Cập nhật trạng thái sản phẩm thành công!")
    res.redirect("back");

};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti=async(req,res)=>{
    const type=req.body.type
    const ids=req.body.ids.split(", ")
    switch(type){
        case "active":
            await Product.updateMany({_id: { $in : ids}},{status: "active"})
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`)
            break;
        case "inactive":
            await Product.updateMany({_id:{ $in : ids}},{status:"inactive"})
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm!`)
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in:ids}},{deleteAt:new Date(),
                deleted:true
            })
            req.flash("success",`Đã xoá thành công ${ids.length} sản phẩm!`)
            break;
        case "change-position":
            for(const item of ids){
                let [id,position]=item.split("-");
                position=parseInt(position)
                await Product.updateOne({_id:id},{position:position})
            }
            req.flash("success",`Đổi vị trí thành công ${ids.length} sản phẩm!`)
            break;
    }

    res.redirect("back")

}

// [DELETE]/admin/products/delete/:id
module.exports.deleteItem=async(req,res)=>{
    const id= req.params.id
    await Product.updateOne({_id:id},{
        deleted: true,
        deleteAt: new Date()
    })
    req.flash("success",`Xoá sản phẩm thành công!`)
    res.redirect("back")
}

// [GET]/admin/products/create
module.exports.create=(req,res)=>{
    res.render("admin/pages/products/create.pug",{
        pageTitle:"Thêm mới sản phẩm"
    })
}

// [POST]/admin/products/create
module.exports.createPost= async(req,res)=>{

    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock)

    if(req.body.position==""){
        const countProducts= await Product.countDocuments();
        req.body.position=countProducts+1;
    } else{
        req.body.position=parseInt(req.body.position)
    }
    req.body.thumbnail=`/uploads/${req.file.filename}`

    const product=new Product(req.body)
    await product.save()
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET]/admin/products/edit/:id
module.exports.edit=async(req,res)=>{
    try {
        const find={
            deleted: false,
            _id:req.params.id
        }
        const product= await Product.findOne(find)
        res.render("admin/pages/products/edit",{
            pageTitle:"Chỉnh sửa sản phẩm",
            Product:product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }  
}

// [PATCH]/admin/products/edit/:id
module.exports.editPatch=async(req,res)=>{
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    req.body.position=parseInt(req.body.position);
    if(req.file){
        req.body.thumbnail=`/uploads/${req.file.filename}`
    }
    try {
        await Product.updateOne({_id:req.params.id},req.body)
        req.flash("success","Cập nhật sản phẩm thành công")
    } catch (error) {
        req.flash("error","Cập nhật thất bại")
    }
    res.redirect("/admin/products")
}

// [GET]/admin/products/detail/:id
module.exports.detail=async(req,res)=>{
    try {
        const find={
            deleted: false,
            _id:req.params.id
        }
        const product= await Product.findOne(find)
        res.render("admin/pages/products/detail",{
            pageTitle:product.title,
            product:product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }   
}