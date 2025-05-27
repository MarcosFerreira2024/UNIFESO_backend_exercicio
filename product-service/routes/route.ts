import { Router } from "express"
import { ProductController } from "../../controller/ProductController"


export const product_routes = Router()


product_routes.post("/",(req,res)=> {ProductController.register(req,res)} )
product_routes.get("/",(req,res)=>{ProductController.getAll(res)} )
product_routes.get("/:id",(req,res)=>{ProductController.getOne(req,res)} )
