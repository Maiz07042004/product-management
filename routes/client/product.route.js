const express=require("express");
const routes=express.Router();
const controller=require("../../controllers/client/product.controller")

routes.get("/",controller.index);
routes.get("/detail/:slug",controller.detail);
routes.get("/:slugCategory",controller.category)

module.exports=routes