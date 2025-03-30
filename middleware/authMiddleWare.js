import jwt from 'jsonwebtoken';
import HttpError from '../models/errorModel.js';

const authMiddleware = async (req, res, next) =>{
    const Authorization = req.headers.Authorization || req.headers.authorization;
    

    if(Authorization && Authorization.startsWith('Bearer')) {
        const token = Authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, info) =>{
            if(error){
                return next(new HttpError('Unathorized. Invalid token', 403))
            }
            req.user = info;
            next()
        })
    } else {
        return next(new HttpError('Unathorized. No token', 402))
    }
}

export default authMiddleware;
// In the above snippet, we created a middleware function that checks if a token is present in the request headers. If the token is present, it verifies the token using the jwt.verify() method. If the token is valid, it attaches the user information to the request object and calls the next middleware function. If the token is invalid or missing, it returns an error response using the HttpError class from the http-errors package.