import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { getAuthUser } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 403 });
        }

        const products = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: products });
    } catch (error: any) {
        console.error('CRITICAL: Admin Fetch Products Error:', {
            message: error.message,
            stack: error.stack,
            mongodb_url_exists: !!process.env.MONGODB_URL,
            db_state: mongoose.connection.readyState
        });
        return NextResponse.json({ success: false, message: 'Server error: ' + error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 403 });
        }

        const formData = await req.formData();
        const productName = formData.get('productName') as string;
        const price = formData.get('price') as string;
        const description = formData.get('description') as string;
        const colors = formData.get('colors') as string;
        const type = formData.get('type') as string;
        const discountPercentage = formData.get('discountPercentage') as string;
        const productImages = formData.getAll('productImages') as File[];

        if (!productName || !price || !description || !colors || !type) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        let parsedColors: string[] = [];
        try {
            parsedColors = JSON.parse(colors);
        } catch (e) {
            parsedColors = [colors];
        }

        const uploadedImages: string[] = [];
        const publicIds: string[] = [];

        if (productImages && productImages.length > 0) {
            for (const file of productImages) {
                if (file.size === 0) continue;
                const buffer = await file.arrayBuffer();
                const base64Image = `data:${file.type};base64,${Buffer.from(buffer).toString('base64')}`;
                const result = await uploadToCloudinary(base64Image, 'products');
                uploadedImages.push(result.secure_url);
                publicIds.push(result.public_id);
            }
        }

        // fallback to placeholder if no images
        if (uploadedImages.length === 0) {
            uploadedImages.push('https://via.placeholder.com/400x400?text=No+Image');
            publicIds.push('placeholder');
        }

        const product = await Product.create({
            productName,
            price: parseFloat(price),
            description,
            color: parsedColors,
            type,
            discountPercentage: discountPercentage ? parseFloat(discountPercentage) : 0,
            productImage: uploadedImages,
            cloudinaryPublicId: publicIds
        });

        return NextResponse.json({
            success: true,
            message: 'Product created successfully',
            data: product
        }, { status: 201 });

    } catch (error: any) {
        console.error('Create Product Error:', {
            message: error.message,
            stack: error.stack,
            mongodb_url_exists: !!process.env.MONGODB_URL,
            db_state: mongoose.connection.readyState
        });
        return NextResponse.json({ success: false, message: 'Server error: ' + error.message }, { status: 500 });
    }
}
