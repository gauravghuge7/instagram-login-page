import express from 'express';
import {jwtAuth} from '../middlewares/auth.middleware.js';

const userRouter = express.Router();


/// import controllers || or methods 


import { 
    signup,
    signin,
    getUser,
    logout,
    updateUser,
    deleteUser


} from '../controllers/user.controller.js';





// define routes 


userRouter.post("/signupInsta", signup);

userRouter.post("/signinInsta", signin);

userRouter.get("/getUser", jwtAuth, getUser);

userRouter.get("/logout", jwtAuth, logout);

userRouter.put("/updateUser", jwtAuth, updateUser);

userRouter.delete("/deleteUser", jwtAuth, deleteUser);

export {
    userRouter
}