const express=require("express");
const routes=express.Router();
const controller=require("../../controllers/client/home.controller")
routes.get("/",controller.index)

module.exports=routes