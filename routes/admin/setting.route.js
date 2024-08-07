const express=require("express");
const multer=require("multer")
const route=express.Router();

const fileUpload = multer()

const controller=require("../../controllers/admin/setting.controller")

const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware")


route.get("/general",controller.general)

route.patch("/general",fileUpload.single("logo"),uploadCloud.upload,controller.generalPatch)


module.exports=route;