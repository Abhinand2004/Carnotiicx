import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: product });
    } catch (error: any) {
        console.error('Get Product Error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error while fetching product' },
            { status: 500 }
        );
    }
}
