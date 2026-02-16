import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { ids } = await req.json();

        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ success: false, message: 'Invalid IDs provided' }, { status: 400 });
        }

        // Find all products that exist in the provided IDs
        const existingProducts = await Product.find({
            _id: { $in: ids }
        }).select('_id');

        const existingIds = existingProducts.map(p => p._id.toString());

        return NextResponse.json({
            success: true,
            existingIds
        });

    } catch (error: any) {
        console.error('Validate Products Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
