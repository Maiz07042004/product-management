const flash = require("express-flash");
const Product=require("../../models/product.model");
const ProductCategory=require("../../models/product-category.model")
const productHelpers=require("../../helpers/products")
const productsCategoryHelper=require("../../helpers/products-category")

// [GET] /products
module.exports.index=async(req,res)=>{
    const products=await Product.find({
        status: "active",
        deleted: false
    }).sort({position:"desc"});
    const newProducts=productHelpers.priceNewProducts(products)
    res.render("client/pages/products/index",{
        pageTitle:"Trang sản phẩm",
        product:newProducts
    })
}

// [GET]/products/detail/:slugProduct
module.exports.detail= async(req,res)=>{
    try {
        const find={
            deleted: false,
            status:"active",
            slug:req.params.slugProduct
        }
        const product= await Product.findOne(find)
        if(product.product_category_id){
            const category=await ProductCategory.findOne({
                _id:product.product_category_id,
                deleted:false,
                status:"active"
            })
            product.category=category
        }
        product.priceNew=productHelpers.priceNewProduct(product)
        res.render("client/pages/products/detail",{
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        flash("erorr","Lỗi")
    }
}


// [GET]/products/:slugCategory
module.exports.category=async(req,res)=>{
    try {
        const category=await ProductCategory.findOne({
            slug:req.params.slugCategory,
            deleted:false,
            status:"active"
        })
        const listSubCategory= await productsCategoryHelper.getSubCategory(category.id)
        const listSubCategoryId=listSubCategory.map(item=>item.id)
        const products=await Product.find({
            product_category_id: {$in:[category.id,...listSubCategoryId]},
            deleted:false,
            status:"active"
        }).sort({position: "desc"})
        const newProducts=productHelpers.priceNewProducts(products)
        res.render("client/pages/products/index",{
            pageTitle:category.title,
            product:newProducts
        })
    } catch (error) {
        req.flash("erorr","Lỗi")
        res.redirect("back")
    }
}