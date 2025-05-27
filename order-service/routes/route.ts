import { Router } from "express"
import { OrderController } from "../../controller/OrderController"


export const order_routes = Router()

order_routes.post("/order",(req,res)=> {OrderController.register(req,res)} )
order_routes.get("/orders",(req,res)=>{OrderController.getAll(req,res)} )
