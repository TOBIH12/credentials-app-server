import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import myUserModel from "../models/userModel.js";
; // Assuming you have a User model
import HttpError from '../models/errorModel.js';

// Register a new user
export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await myUserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
       await myUserModel.create({
        username, email, password: hashedPassword
       })

        res.status(201).json({ message: `User ${email} registered successfully` });
    } catch (error) {
        return next(new HttpError(error))
    }
};

// Login a user
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await myUserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
       
        const token = jwt.sign({ id: user._id, name: user.username }, process.env.JWT_SECRET, {
            expiresIn: '5h',
        });

        res.status(200).json({ message: 'Login successful', token, id: user._id, name: user.username });
    } catch (error) {
        return next(new HttpError(error))
    }
};