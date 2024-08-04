const ProductCategory=require("../../models/product-category.model")
const Product=require("../../models/product.model")
const createTreeHelpers=require("../../helpers/createTree")
const productHelpers=require("../../helpers/product")
// [GET]/
module.exports.index=async(req,res)=>{
    const products=await Product.find({
        deleted:false,
        status:"active",
        featured: "1"
    }).limit(6)
    const newProducts=productHelpers.priceNewProducts(products)
    res.render("client/pages/home/index",{
        pageTitle:"Trang chủ",
        productsFeatured:newProducts
    });
}