
import JWT from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const jwtAuth = asyncHandler(async (req, res, next) => {

    try {

        const token = (req.cookies && req.cookies.token);
        if(!token) {

            // throw new ApiError(401, "unauthorised access please login first");

            return res
            .status(401)
            .json({
                suceess : false,
                message : "unauthorised access please login first",
                 
            })
        }


        const payload = JWT.verify(token, process.env.SECRET);

        const decodePayload = JWT.decode(token, process.env.SECRET);
    
        req.user = {id: payload._id, email: payload.email};
    
        req.user = {
            id: decodePayload.id,
            email: decodePayload.email,
            name: decodePayload.name,
            username: decodePayload.username,
            bio: decodePayload.bio,

        }

        next();
    } 
    
    catch (error) {

        console.log(error);

        return res
        .status(401)
        .json({
            suceess : false,
            message : error.message
        })

        // throw new ApiError(401, error.message);
        
    }
})

export {
    jwtAuth
}