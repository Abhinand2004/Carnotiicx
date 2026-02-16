import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Setting from '@/models/Setting';

export async function GET() {
    try {
        await dbConnect();

        // Find the hero background setting
        let setting = await Setting.findOne({ key: 'hero_background' });

        const defaultBackground = "https://lh3.googleusercontent.com/aida-public/AB6AXuAk_po-iyyHLclTIJ1Xf244Y-DoqmQJbob9XceXnQcnB9BUKIO2Md49OFX02SzAHN4SFKPd9_Rd5XrJYm2tARWveDMGJRB46c9NU9oOQOvRDI7E9XNSPT8Kkl79kweyzY-8MmLHn1nV5wqocLUYH_UReZ1xZfM872zosgHn8J4lsZxCHE6-hLnbmxN33THQlEiUeeUqxGjiUyCfsrlx5Aio7zsGMz8w1VI5q9GwyBzIxWrecxcDREm2vcUnNpzDFb2NBapMXyxIPnA";

        if (!setting) {
            // Return default if no setting exists yet
            return NextResponse.json({
                success: true,
                data: {
                    value: defaultBackground,
                    isCustom: false
                }
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                value: setting.isCustom ? setting.value : defaultBackground,
                isCustom: setting.isCustom,
                customValue: setting.value // Always return the custom image if we have it
            }
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
