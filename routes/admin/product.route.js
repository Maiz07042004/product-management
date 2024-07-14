const express=require("express");

const multer=require("multer")
// const storageMulter=require("../../helpers/storageMulter")
// const upload=multer({storage: storageMulter()});
const fileUpload = multer()

const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware")


const route=express.Router();
const controllerProduct=require("../../controllers/admin/product.controller")
const validate=require("../../validates/admin/product.validate")

route.get("/",controllerProduct.index)
route.patch("/change-status/:status/:id",controllerProduct.changeStatus)
route.patch("/change-multi",controllerProduct.changeMulti)
route.delete("/delete/:id",controllerProduct.deleteItem)
route.get("/create",controllerProduct.create)
route.post("/create",fileUpload.single("thumbnail"),uploadCloud.upload,validate.createPost,controllerProduct.createPost)
route.get("/edit/:id",controllerProduct.edit)
route.patch("/edit/:id",fileUpload.single("thumbnail"),validate.createPost,controllerProduct.editPatch)
route.get("/detail/:id",controllerProduct.detail)

module.exports=route;