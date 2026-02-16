import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const formData = await req.formData();

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const phone = formData.get('phone') as string;
        const profilePhoto = formData.get('profilePhoto') as File | null;

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json(
                { success: false, message: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                { success: false, message: 'User already exists' },
                { status: 400 }
            );
        }

        let photoUrl = null;
        let photoPublicId = null;

        if (profilePhoto) {
            const buffer = await profilePhoto.arrayBuffer();
            const base64Image = `data:${profilePhoto.type};base64,${Buffer.from(buffer).toString('base64')}`;
            const result = await uploadToCloudinary(base64Image, 'profiles');
            photoUrl = result.secure_url;
            photoPublicId = result.public_id;
        }

        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            phone,
            profilePhoto: photoUrl,
            profilePhotoPublicId: photoPublicId,
            role: 'user'
        });

        const token = signToken({ userId: user._id, role: user.role });

        return NextResponse.json({
            success: true,
            message: 'Registration successful',
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error during registration' },
            { status: 500 }
        );
    }
}
