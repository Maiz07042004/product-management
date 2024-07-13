const dashboardRoute=require("./dashboard.route.js")
const productRoute=require("./product.route.js")
const systemConfig=require("../../config/system.js")
module.exports=(app)=>{
    const PATH=systemConfig.prefixAdmin
    app.use(PATH+"/dashboard",dashboardRoute)
    app.use(PATH+"/products",productRoute)
}