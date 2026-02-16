import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: user });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const user = await User.findById(decoded.userId);

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const phone = formData.get('phone') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const profilePhoto = formData.get('profilePhoto') as File | null;

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (phone) user.phone = phone;
        if (email) user.email = email;
        if (password) user.password = password;

        if (profilePhoto) {
            // Delete old photo
            if (user.profilePhotoPublicId) {
                await deleteFromCloudinary(user.profilePhotoPublicId);
            }

            const buffer = await profilePhoto.arrayBuffer();
            const base64Image = `data:${profilePhoto.type};base64,${Buffer.from(buffer).toString('base64')}`;
            const result = await uploadToCloudinary(base64Image, 'profiles');
            user.profilePhoto = result.secure_url;
            user.profilePhotoPublicId = result.public_id;
        }

        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                profilePhoto: user.profilePhoto
            }
        });

    } catch (error: any) {
        console.error('Update Profile Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
