import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string): string => {
    const secret = process.env.JWT_SECRET as string;

    return jwt.sign({ id: userId, role: role }, secret, {
        expiresIn: '7d',
    });
};