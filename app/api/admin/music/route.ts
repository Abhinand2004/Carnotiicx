import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Music from '@/models/Music';
import { getAuthUser } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        const formData = await req.formData();
        const title = formData.get('title') as string;
        const audioFile = formData.get('audio') as File;

        if (!title || !audioFile) {
            return NextResponse.json({ success: false, message: 'Missing title or audio file' }, { status: 400 });
        }

        const buffer = await audioFile.arrayBuffer();
        const base64Audio = `data:${audioFile.type};base64,${Buffer.from(buffer).toString('base64')}`;

        const result = await uploadToCloudinary(base64Audio, 'music');

        const music = await Music.create({
            title,
            url: result.secure_url,
            cloudinaryPublicId: result.public_id
        });

        return NextResponse.json({ success: true, data: music }, { status: 201 });
    } catch (error: any) {
        console.error('Admin Music Upload Error:', error);
        return NextResponse.json({ success: false, message: 'Server error: ' + error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        const tracks = await Music.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: tracks });
    } catch (error: any) {
        console.error('Admin Fetch Music Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
