import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export interface DecodedToken {
    userId?: string;
    id?: string;
    role: string;
    iat: number;
    exp: number;
}

export const signToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as DecodedToken;
    } catch (error: any) {
        console.error('JWT Verification Error:', {
            message: error.message,
            token_provided: !!token,
            secret_exists: !!JWT_SECRET
        });
        return null;
    }
};

export const getAuthUser = (req: NextRequest): DecodedToken | null => {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.warn('Missing or malformed Authorization header');
            return null;
        }

        const token = authHeader.split(' ')[1];
        return verifyToken(token);
    } catch (error) {
        console.error('getAuthUser Error:', error);
        return null;
    }
};
