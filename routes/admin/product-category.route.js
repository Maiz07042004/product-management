const express=require("express");
const route=express.Router();

const controllerProductCategory=require("../../controllers/admin/product-category.controller.js")
const multer=require("multer")
const fileUpload = multer()
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware")
const validate=require("../../validates/admin/product-category.validates.js")

route.get("/",controllerProductCategory.index)
route.get("/create",controllerProductCategory.create)
route.post("/create",fileUpload.single("thumbnail"),uploadCloud.upload,validate.createPost,controllerProductCategory.createPost)
route.patch("/change-status/:status/:id",controllerProductCategory.changeStatus)
route.delete("/delete/:id",controllerProductCategory.deleteItem)
route.patch("/change-multi",controllerProductCategory.changeMulti)
module.exports=route;