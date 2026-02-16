import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Setting from '@/models/Setting';
import { getAuthUser } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 403 });
        }

        const formData = await req.formData();
        const image = formData.get('image') as File;

        if (!image || image.size === 0) {
            return NextResponse.json({ success: false, message: 'No image provided' }, { status: 400 });
        }

        const buffer = await image.arrayBuffer();
        const base64Image = `data:${image.type};base64,${Buffer.from(buffer).toString('base64')}`;
        const uploadResult = await uploadToCloudinary(base64Image, 'settings');

        const setting = await Setting.findOneAndUpdate(
            { key: 'hero_background' },
            {
                value: uploadResult.secure_url,
                isCustom: true
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Hero background updated successfully',
            data: setting
        });

    } catch (error: any) {
        console.error('Update Hero Background Error:', error);
        return NextResponse.json({ success: false, message: 'Server error: ' + error.message }, { status: 500 });
    }
}
