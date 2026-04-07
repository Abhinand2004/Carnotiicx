import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Setting from '@/models/Setting';
import { getAuthUser } from '@/lib/auth';

const normalizeItems = (items: unknown): string[] => {
    if (!Array.isArray(items)) return [];

    return items
        .map((item) => typeof item === 'string' ? item.trim() : '')
        .filter(Boolean)
        .slice(0, 20);
};

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 403 });
        }

        const setting = await Setting.findOne({ key: 'hero_ticker' });
        const items = setting?.value ? normalizeItems(JSON.parse(setting.value)) : [];

        return NextResponse.json({
            success: true,
            data: {
                items
            }
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch ticker settings';
        return NextResponse.json({ success: false, message: 'Server error: ' + message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 403 });
        }

        const body = await req.json();
        const items = normalizeItems(body?.items);

        if (items.length === 0) {
            return NextResponse.json({ success: false, message: 'Add at least one ticker item' }, { status: 400 });
        }

        const setting = await Setting.findOneAndUpdate(
            { key: 'hero_ticker' },
            {
                value: JSON.stringify(items),
                isCustom: true
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Ticker updated successfully',
            data: {
                items,
                setting
            }
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update ticker settings';
        return NextResponse.json({ success: false, message: 'Server error: ' + message }, { status: 500 });
    }
}
