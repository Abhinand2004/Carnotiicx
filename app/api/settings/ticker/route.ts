import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Setting from '@/models/Setting';

const defaultItems = [
    'TOP DEALS',
    'FREE SHIPPING ON ORDERS OVER 150',
    'NEW DROP: MIDNIGHT RUNNER',
    'LIMITED EDITION'
];

const parseTickerItems = (value?: string | null): string[] => {
    if (!value) return defaultItems;

    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
            const items = parsed
                .map((item) => typeof item === 'string' ? item.trim() : '')
                .filter(Boolean);
            return items.length > 0 ? items : defaultItems;
        }
    } catch {
        return defaultItems;
    }

    return defaultItems;
};

export async function GET() {
    try {
        await dbConnect();

        const setting = await Setting.findOne({ key: 'hero_ticker' });
        const items = parseTickerItems(setting?.value);

        return NextResponse.json({
            success: true,
            data: {
                items
            }
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch ticker settings';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
