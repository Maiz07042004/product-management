const express=require("express");

const multer=require("multer")
const storageMulter=require("../../helpers/storageMulter")
const upload=multer({storage: storageMulter()});

const route=express.Router();
const controllerProduct=require("../../controllers/admin/product.controller")
const validate=require("../../validates/admin/product.validate")

route.get("/",controllerProduct.index)
route.patch("/change-status/:status/:id",controllerProduct.changeStatus)
route.patch("/change-multi",controllerProduct.changeMulti)
route.delete("/delete/:id",controllerProduct.deleteItem)
route.get("/create",controllerProduct.create)
route.post("/create",upload.single("thumbnail"),validate.createPost,controllerProduct.createPost)
route.get("/edit/:id",controllerProduct.edit)
route.patch("/edit/:id",upload.single("thumbnail"),validate.createPost,controllerProduct.editPatch)
route.get("/detail/:id",controllerProduct.detail)

module.exports=route;