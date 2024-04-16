import { userModel } from "../model/user.model.js";
import bcrypt from 'bcrypt';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import JWT from 'jsonwebtoken';




const signup = (async (req, res, next) => {

     // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    try {
        
        const {name, username, email, password, bio} = req.body || {};
        console.log(name, username, email, password, bio);

        if(!(name, username, email, password, bio)) {
            
            res.status(400).json({
                success: false,
                message: "all fields are required"

            })
        }

        const existedUser = await userModel.findOne({email});

        if(existedUser) {
            res.status(400).json({
                success: false,
                message: "account already existed"
            })
        
        }
        else {
                
            const ecryptPassword = await bcrypt.hash("password", 10);

            const user = await userModel.create({
                name, 
                email,
                username,
                password: ecryptPassword,
                bio
            })

            const savedUser = await user.save();

            res.status(200).json({
                success: true,
                message: "user register successfully ",
                backend: savedUser,

            })
        }


    }
    catch (error) {
       
        res.status(400).json({
            success: false,
            message: [error.message,"error in signing in user"]
        })
    }

})


const signin = asyncHandler(async (req, res, next) => {

    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie
try {
    
        const {email, password} = req.body;
        console.log(email, password);
    
        if(!email || !password) {
            throw new ApiError(400, "email or password is required");
        }
    
        const user = await userModel
            .findOne({
                $or: [
                    {email},
                ]
            })
            .select('+password')
    
        if(!user) {
    
            throw new ApiError(400, "user not found");
            
            // alter method for above code && default error message
    
            // return res
            // .status(400)
            // .json({
            //     success: false,
            //     message: "user not found"
            // })
        }
        
    
        const checkPassword = await bcrypt.compare(password, user.password);
    
        if(checkPassword) {
            // throw new ApiError(400, "password is incorrect");
            return res.status(400).json({    
                success: false,
                message: "password is incorrect"
            })
        }
    
    
        const token = user.jwtToken();
        // const refreshToken = userModel.jwtToken();
    
        user.password = undefined;
    
        const cookieOptions = {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: true,
        
        }
        
        
        
       
        res.status(200)
        res.cookie("token", token, cookieOptions)
        res.json(
    
            new ApiResponse(200, "user sign in successfully", user),
            res.status(200),
            res.cookie("token", token, cookieOptions)
    
            // {
            //     name: "username"
            // }
            // success: true,
            // message: "user sign in successfully",
            // backend: user
    
        )
} 
catch (error) {
    res.status(400).json({
        success: false,
        message: [error.message,"error in signing in user"]
    })
}

})


const getUser = asyncHandler(async (req, res, next) => {

    const userId = req.user.id;

    console.log(userId);
    try {
        const user = await userModel.findById(userId);
        
        console.log(user);
        if(!user) {
            new ApiError(400, "user is not login ");
        }
    
        const info = user;

        return res
        .status(200)
        .json({
            success: true,
            message: "user login successfully in instagram",
        
            backend: info,
            user

        })

        // .status(200)
        // .json(
        //     new ApiResponse(200, true, "user is login", user)
        // )
    } 
    catch (error) {
        throw new ApiError(400, error.message);
    }
    
})

const logout = asyncHandler (async( req,res ) => {
    try {

        const cookieOption = {
            expires: new Date(0),
            httpOnly: true,
            secure: true,
        }

        res.clearCookie("token",  null, cookieOption);
        
        res.cookie("token", "", cookieOption);

        return res
        .status(200)
        .json({
            success: true,
            message: "user logout successfully",
        })

    }
    catch(error) {
        throw new ApiError(400, " please log in first ",error.message);
    }
})


const updateUser = asyncHandler(async (req, res) => {
    try {
    
        const {email, password, username, name} = req.body;

        console.log(email);

        const info = req.body;

        if(!email || !password || !username || !name) {
            throw new ApiError(400, "email or password is required");
        }

        const user = await userModel
            .findOne({email})
            .select('+password')


        if(!user) {
            throw new ApiError(400, "user not found");
        }



        const checkPassword = await bcrypt.compare(password, user.password);
        
        if(checkPassword) {
            throw new ApiError(400, "password is incorrect");
        }

        const updateUser = await userModel.findByIdAndUpdate(info._id, {password, username, name})
        
        // if(!updateUser) {
        //     throw new ApiError(400, "user can't be updated yet to ");
        // }

        
        return res
        .status(200)
        .json(
            new ApiResponse(200, "user updated successfully", updateUser)
        )
    } 
    catch (error) {

        throw new ApiError(400, "this is catch block to code", error.message, error);
    }
})


const deleteUser = asyncHandler(async (req,res) => {
    try {
    
        // accept input from frontend
        const {email, password, username, name} = req.body;

        console.log(email);

        if(!email || !password || !username || !name) {
            throw new ApiError(400, "email or password is required");
        }

        const user = await userModel
            .findOne({email})
            .select('+password')

        if(!user) {
            throw new ApiError(400, "user not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(checkPassword) {
            throw new ApiError(400, "password is incorrect");
        }

        const deleteUser = await userModel.findByIdAndDelete(user.id);

        if(!deleteUser) {
            throw new ApiError(400, "user can't be deleted yet to ");
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, "user deleted successfully", deleteUser)
        )


        
    } 
    catch (error) {
        throw new ApiError(400, error.message);
    }
})


export {
    signup,
    signin,
    getUser,
    logout,
    updateUser,
    deleteUser
}