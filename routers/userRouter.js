import express from "express"
import userController from "../controllers/userController.js"
const router=express.Router()

const userRouter = () => {
    router.post("/user",(req,res)=>userController.createUser(req,res))
    router.get("/user",(req,res)=>userController.getAllUser(req,res))
    router.get("/user/:id",(req,res)=>userController.getUserById(req,res))
    router.put("/user/:id",(req,res)=>userController.updateUser(req,res))
    router.delete("/user/:id",(req,res)=>userController.deleteUser(req,res))
    router.post("/user/login",(req,res)=>userController.login(req,res))

    return router
}

export default userRouter