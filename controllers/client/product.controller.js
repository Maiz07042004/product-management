const flash = require("express-flash");
const Product=require("../../models/product.model");

// [GET] /products
module.exports.index=async(req,res)=>{
    const products=await Product.find({
        status: "active",
        deleted: false
    }).sort({position:"desc"});
    console.log(products)
    const newProducts=products.map(item=>{
        item.newPrice=(item.price*(100-item.discountPercentage)/100).toFixed()
        return item
    })
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