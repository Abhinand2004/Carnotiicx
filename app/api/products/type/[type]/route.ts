import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
    try {
        await dbConnect();
        const { type } = await params;

        if (!['car', 'bike', 'f1'].includes(type)) {
            return NextResponse.json(
                { success: false, message: 'Invalid product type. Must be car, bike, or f1' },
                { status: 400 }
            );
        }

        const products = await Product.find({ type }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: products,
            count: products.length
        });
    } catch (error: any) {
        console.error('Get Products By Type Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
