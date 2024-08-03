const express=require("express");
const route=express.Router();
const multer=require("multer")
const fileUpload = multer()

const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware")
const controller=require("../../controllers/admin/my-account.controller")

route.get("/",controller.index)

route.get("/edit",controller.edit)

route.patch("/edit",fileUpload.single("avatar"),uploadCloud.upload,controller.editPatch)

module.exports=route;