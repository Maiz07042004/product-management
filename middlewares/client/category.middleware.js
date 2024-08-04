const ProductCategory=require("../../models/product-category.model")

const createTreeHelpers=require("../../helpers/createTree")

module.exports.category=async(req,res,next)=>{
    const productsCategory= await ProductCategory.find({
        deleted:false,
        status:"active"
    })
    const newProductsCategory=createTreeHelpers.tree(productsCategory)

    res.locals.layoutProductsCategory=newProductsCategory

    next();
}