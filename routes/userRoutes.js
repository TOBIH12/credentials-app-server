import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';


export const userRouter = express();

// Define routes and connect to userControllers
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);