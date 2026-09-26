import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email?: string;
        role?: string;
    };
}

const verifyJWT = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your_secret_key'
        ) as { id: string; email?: string; role?: string };

        req.user = decodedToken;
        next();

    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
})

export { verifyJWT };