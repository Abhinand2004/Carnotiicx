import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);

        const type = searchParams.get('type');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const sortBy = searchParams.get('sortBy');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '9');
        const search = searchParams.get('search');

        // Build filter object
        const filter: any = {};
        if (type && ['car', 'bike', 'f1'].includes(type)) {
            filter.type = type;
        }
        if (search) {
            filter.productName = { $regex: search, $options: 'i' };
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        // Build sort object
        let sort: any = { createdAt: -1 };
        if (sortBy) {
            switch (sortBy) {
                case 'price-low':
                    sort = { price: 1 };
                    break;
                case 'price-high':
                    sort = { price: -1 };
                    break;
                case 'newest':
                    sort = { createdAt: -1 };
                    break;
                case 'oldest':
                    sort = { createdAt: 1 };
                    break;
                case 'discount':
                    sort = { discountPercentage: -1 };
                    break;
            }
        }

        const skip = (page - 1) * limit;
        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            success: true,
            data: products,
            total,
            page,
            limit,
            count: products.length
        });

    } catch (error: any) {
        console.error('Get Products Error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error while fetching products' },
            { status: 500 }
        );
    }
}
