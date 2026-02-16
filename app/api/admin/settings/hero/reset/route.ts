import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Setting from '@/models/Setting';
import { getAuthUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 403 });
        }

        const setting = await Setting.findOneAndUpdate(
            { key: 'hero_background' },
            { isCustom: false },
            { new: true }
        );

        if (!setting) {
            return NextResponse.json({ success: false, message: 'Hero background setting not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Hero background reset to default',
            data: setting
        });

    } catch (error: any) {
        console.error('Reset Hero Background Error:', error);
        return NextResponse.json({ success: false, message: 'Server error: ' + error.message }, { status: 500 });
    }
}
