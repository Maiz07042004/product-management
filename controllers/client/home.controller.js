const ProductCategory=require("../../models/product-category.model")
const createTreeHelpers=require("../../helpers/createTree")

// [GET]/
module.exports.index=async(req,res)=>{
    res.render("client/pages/home/index",{
        pageTitle:"Trang chủ",
    });
}