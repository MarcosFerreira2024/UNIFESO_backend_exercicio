import { Router } from "express"
import { AuthController } from "../../controller/AuthController"


export const auth_routes = Router()



auth_routes.post("/register",(req,res)=> {
    AuthController.register(req,res)
})
auth_routes.post("/login",(req,res)=>{
    AuthController.login(req,res)
})

auth_routes.post("/verify",(req,res)=>{
    AuthController.verify(req,res)
})

