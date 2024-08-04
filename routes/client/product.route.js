const express=require("express");
const routes=express.Router();
const controller=require("../../controllers/client/product.controller")

routes.get("/",controller.index);
routes.get("/detail/:slugProduct",controller.detail);
routes.get("/:slugCategory",controller.category)

module.exports=routes