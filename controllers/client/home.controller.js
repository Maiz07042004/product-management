const ProductCategory=require("../../models/product-category.model")
const Product=require("../../models/product.model")
const createTreeHelpers=require("../../helpers/createTree")
const productHelpers=require("../../helpers/products")
// [GET]/
module.exports.index=async(req,res)=>{
    // Lấy ra sản phẩm nổi bật
    const productsFeatured=await Product.find({
        deleted:false,
        status:"active",
        featured: "1"
    }).limit(6)
    const newProductsFeatured=productHelpers.priceNewProducts(productsFeatured)
    // Hết lấy ra sản phẩm nổi bật

    // Hiển thị danh sách sản phẩm mới nhất
    const productsNew=await Product.find({
        deleted:false,
        status:"active"
    }).sort({position: "desc"}).limit(6)
    const newProductsNew=productHelpers.priceNewProducts(productsNew)
    res.render("client/pages/home/index",{
        pageTitle:"Trang chủ",
        productsFeatured:newProductsFeatured,
        productsNew:newProductsNew
    });
}