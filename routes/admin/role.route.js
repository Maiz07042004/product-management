const express=require("express");
const route=express.Router();
const controllerRole=require("../../controllers/admin/role.controller")


route.get("/",controllerRole.index)
route.get("/create",controllerRole.create)
route.post("/create",controllerRole.createPost)
route.get("/edit/:id",controllerRole.edit)
route.patch("/edit/:id",controllerRole.editPatch)
route.delete("/delete/:id",controllerRole.delete)
route.get("/detail/:id",controllerRole.detail)
route.get("/permissions",controllerRole.permissions)
route.patch("/permissions",controllerRole.permissionsPatch)

module.exports=route;