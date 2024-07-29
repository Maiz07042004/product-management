const express=require("express");
const route=express.Router();
const multer=require("multer")
const fileUpload = multer()
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware")
const controller=require("../../controllers/admin/account.controller")
const validate=require("../../validates/admin/account.validate.js")

route.get("/",controller.index)
route.get("/create",controller.create)
route.post("/create",fileUpload.single("avatar"),uploadCloud.upload,validate.createPost,controller.createPost)
route.get("/edit/:id",controller.edit)
route.patch("/edit/:id",fileUpload.single("avatar"),uploadCloud.upload,validate.editPatch,controller.editPatch)

module.exports=route;