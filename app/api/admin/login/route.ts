import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Please provide username and password' },
                { status: 400 }
            );
        }

        // Auto-initialize admin if it doesn't exist (mirroring original setup logic)
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (!existingAdmin) {
            await User.create({
                username: process.env.ADMIN_USERNAME || 'admin',
                email: 'admin@Carnottix.com',
                password: process.env.ADMIN_PASSWORD || 'admin123',
                role: 'admin'
            });
        }

        // Find user by username
        const user = await User.findOne({ username, role: 'admin' });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials or not an admin' },
                { status: 401 }
            );
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create token
        const token = signToken({ userId: user._id, role: user.role });

        return NextResponse.json({
            success: true,
            message: 'Admin login successful',
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            }
        });

    } catch (error: any) {
        console.error('Admin Login Error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error during admin login' },
            { status: 500 }
        );
    }
}
