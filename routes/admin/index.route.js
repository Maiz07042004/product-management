const dashboardRoute=require("./dashboard.route.js")
const productRoute=require("./product.route.js")
const productCategoryRoute=require("./product-category.route.js")
const roleRoute=require("./role.route.js")
const accountRoute=require("./account.route.js")
const systemConfig=require("../../config/system.js")
module.exports=(app)=>{
    const PATH=systemConfig.prefixAdmin
    app.use(PATH+"/dashboard",dashboardRoute)
    app.use(PATH+"/products",productRoute)
    app.use(PATH+"/products-category",productCategoryRoute)
    app.use(PATH+"/roles",roleRoute)
    app.use(PATH+"/accounts",accountRoute)
}