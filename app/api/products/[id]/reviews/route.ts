import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { getAuthUser } from '@/lib/auth';
import User from '@/models/User';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const decoded = getAuthUser(req);
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { rating, comment } = await req.json();
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        const alreadyReviewed = product.reviews.find(
            (r: any) => r.user.toString() === decoded.userId
        );

        if (alreadyReviewed) {
            return NextResponse.json({ success: false, message: 'Product already reviewed' }, { status: 400 });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const review = {
            name: `${user.firstName} ${user.lastName}`,
            rating: Number(rating),
            comment,
            user: user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        return NextResponse.json({ success: true, message: 'Review added' }, { status: 201 });

    } catch (error: any) {
        console.error('Add Review Error:', error);
        return NextResponse.json({ success: false, message: 'Server error while adding review' }, { status: 500 });
    }
}
