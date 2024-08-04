const flash = require("express-flash");
const Product=require("../../models/product.model");
const productHelpers=require("../../helpers/product")

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

// [GET]/products/:slug
module.exports.detail= async(req,res)=>{
    try {
        const find={
            deleted: false,
            status:"active",
            slug:req.params.slug
        }
        const product= await Product.findOne(find)
        res.render("client/pages/products/detail",{
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        flash("erorr","Lỗi")
    }
}