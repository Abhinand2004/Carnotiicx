import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Music from '@/models/Music';

export async function GET() {
    try {
        await dbConnect();
        const tracks = await Music.find({ isActive: true }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: tracks });
    } catch (error: any) {
        console.error('Fetch Music Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
