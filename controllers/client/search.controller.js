const Product=require("../../models/product.model");
const searchHelper=require("../../helpers/search")
const productsHelper=require("../../helpers/products")

module.exports.index=async(req,res)=>{
    const objectSearch=searchHelper(req.query)
    let newProducts=[]
    if(objectSearch.keyword){
        const Products=await Product.find({
            title:objectSearch.regex,
            deleted:false,
            status:"active"
        })
        newProducts=productsHelper.priceNewProducts(Products)
    }
    res.render("client/pages/search/index.pug",{
        pageTitle:"Kết quả tìm kiếm",
        keyword:objectSearch.keyword,
        Products:newProducts
    }
    )
}