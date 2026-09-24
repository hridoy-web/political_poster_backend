import { Request, Response } from 'express';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// register
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, emailOrPhone, password, role } = req.body;

    if (!name || !emailOrPhone || !password) {
        throw new ApiError(400, 'All fields are required.')
    }

    const existingUser = await User.findOne({ emailOrPhone })

    if (existingUser) {
        throw new ApiError(400, 'User already exists with this email or phone.');
    }

    const user = await User.create({
        name,
        emailOrPhone,
        password,
        role: role || 'user',
    });

    const token = generateToken(user._id.toString(), user.role);

    const createdUser = {
        id: user._id,
        name: user.name,
        emailOrPhone: user.emailOrPhone,
        role: user.role,
    };

    return res.status(201).json(
        new ApiResponse(201, { user: createdUser, token }, 'Registration successful.')
    );
});


// login
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
        throw new ApiError(400, 'All fields are required.')
    }

    const user = await User.findOne({ emailOrPhone })

    if (!user) {
        throw new ApiError(400, 'Invalid email or password')
    }

    const isPasswordValid = await (user as any).isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, 'Invalid password')
    }

    const token = generateToken(user._id.toString(), user.role);

    const loggedInUser = {
        id: user._id,
        name: user.name,
        emailOrPhone: user.emailOrPhone,
        role: user.role,
    };

    return res.status(200).json(
        new ApiResponse(200, { user: loggedInUser, token }, 'Login successful.')
    );
})

export { registerUser, loginUser };