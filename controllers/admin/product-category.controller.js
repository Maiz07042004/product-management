const ProductCategory=require("../../models/product-category.model")
const systemConfig=require("../../config/system")
const filterStatusHelpers=require("../../helpers/filterStatus")
const searchHelpers=require("../../helpers/search")
const objectPaginationHelpers=require("../../helpers/pagination")
const createTreeHelpers=require("../../helpers/createTree")



// [GET]/admin/products
module.exports.index=async(req,res)=>{
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
    let sort={
    }
    if(req.query.sortKey && req.query.sortValue){
        const key=req.query.sortKey;
        const value=req.query.sortValue;
        sort[key]=value
    } else{
        sort.position="desc"
    }
    const countRecord=await ProductCategory.countDocuments(find)
    let objectPagination=objectPaginationHelpers(
        {
            currenPage:1,
            limitItem:5},
            req.query,
            countRecord
    )
    const records=await ProductCategory.find(find).skip(objectPagination.skip).sort(sort)
    const newRecords=createTreeHelpers.tree(records)
    res.render("admin/pages/products-category/index.pug",{
        pageTitle:"Danh mục sản phẩm",
        filterStatus: filterStatus,
        records: newRecords,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
        
    }
    )
}

// [GET]/admin/products-category/create
module.exports.create=async(req,res)=>{
    let find={
        deleted:false
    }
    const record=await ProductCategory.find(find)
    const newRecords=createTreeHelpers.tree(record)
    res.render("admin/pages/products-category/create.pug",{
        pageTitle:"Danh mục sản phẩm",
        records:newRecords
    }
    )
}

// [POST]/admin/products-category/create
module.exports.createPost=async(req,res)=>{
    if(req.body.position==""){
        const count=await ProductCategory.countDocuments();
        req.body.position=count+1;
    } else{
        req.body.position=parseInt(req.body.position)
    }
    const record=new ProductCategory(req.body)
    await record.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}

// [PATCH]/admin/products-category/:status/:id
module.exports.changeStatus=async(req,res)=>{
    const id=req.params.id
    const status=req.params.status

    await ProductCategory.updateOne({_id:id},{status:status});
    req.flash("success","Cập nhật trạng thái thành công");
    res.redirect("back");
}

// [DELETE]/admin/products-category/delete/:id
module.exports.deleteItem=async(req,res)=>{
    const id=req.params.id
    await ProductCategory.updateOne({_id:id},{deleted:true,
        deleteAt: new Date()
    })
    res.redirect("back")
}

// [PATCH]/admin/products-category/change-multi
module.exports.changeMulti=async(req,res)=>{
    const type=req.body.type;
    const ids=req.body.ids.split(", ")
    switch (type) {
        case "active":
            await ProductCategory.updateMany({_id:{$in : ids}},{status: "active"})
            req.flash("success",`Cập nhật trạng thái thành công cho ${ids.length} sản phẩm`)
            break;
        case "inactive":
            await ProductCategory.updateMany({_id:{$in: ids}},{status:"inactive"})
            req.flash("success",`Cập nhật trạng thái thành công cho ${ids.length} sản phẩm`)
            break;
        case "delete-all":
            await ProductCategory.updateMany({_id: {$in:ids}},{deleted:true,
                deleteAt: new Date()
            })
            req.flash("success",`Đã xoá thành công ${ids.length} sản phẩm`)
            break;
        case "change-position":
            for(const item of ids){
                let [id,position]=item.split("-");
                position=parseInt(position)
                await ProductCategory.updateOne({_id:id},{position:position});
            }
            req.flash("success",`Đổi vị trí thành công ${ids.length} sản phẩm!`)
            break;
        default:
            break;
    }
    res.redirect("back")
}

// [GET]/admin/products-category/edit/:id
module.exports.edit=async(req,res)=>{
    try {
        const find={
            deleted:false,
            _id:req.params.id
        }
        const data= await ProductCategory.findOne(find)
        const records=await ProductCategory.find({deleted:false})
        const newRecords=createTreeHelpers.tree(records)
        res.render("admin/pages/products-category/edit.pug",{
            data:data,
            records:newRecords
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }

}

// [PATCH]/admin/products-category/edit/:id
module.exports.editPatch=async(req,res)=>{
    req.body.position=parseInt(req.body.position);
    try {
        await ProductCategory.updateOne({_id:req.params.id},req.body)
        req.flash("success","Cập nhật sản phẩm thành công")
    } catch (error) {
        req.flash("error","Cập nhật thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}


// [GET]/admin/products-category/detail/:id
module.exports.detail=async(req,res)=>{
    try {
        let find={
            deleted:false,
            _id:req.params.id
        }
        const record=await ProductCategory.findOne(find)
        res.render("admin/pages/products-category/detail.pug",{
            product:record
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }

}