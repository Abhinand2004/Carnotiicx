import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();
        const products = await Product.find({
            discountPercentage: { $gt: 0 }
        }).sort({ discountPercentage: -1, createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: products,
            count: products.length
        });
    } catch (error: any) {
        console.error('Get Discounted Products Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
