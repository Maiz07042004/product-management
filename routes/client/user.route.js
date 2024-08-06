const express=require("express");
const route=express.Router();

const controller=require("../../controllers/client/user.controller")
const validate=require("../../validates/client/user.validate")

route.get("/register",controller.register)

route.post("/register",validate.createPost,controller.registerPost)

route.get("/login",controller.login)

route.post("/login",validate.loginPost,controller.loginPost)

module.exports=route