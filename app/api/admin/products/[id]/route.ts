import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { getAuthUser } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 403 });
        }

        const formData = await req.formData();
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        const productName = formData.get('productName') as string;
        const price = formData.get('price') as string;
        const description = formData.get('description') as string;
        const colors = formData.get('colors') as string;
        const type = formData.get('type') as string;
        const discountPercentage = formData.get('discountPercentage') as string;
        const productImages = formData.getAll('productImages') as File[];

        if (productName) product.productName = productName;
        if (price) product.price = parseFloat(price);
        if (description) product.description = description;
        if (colors) {
            try {
                product.color = JSON.parse(colors);
            } catch (e) {
                product.color = [colors];
            }
        }
        if (type) product.type = type;
        if (discountPercentage !== undefined) product.discountPercentage = parseFloat(discountPercentage);

        // Handle new images
        if (productImages && productImages.length > 0 && productImages[0].size > 0) {
            // Delete old images from Cloudinary
            if (product.cloudinaryPublicId && product.cloudinaryPublicId.length > 0) {
                for (const pid of product.cloudinaryPublicId) {
                    if (pid !== 'placeholder') {
                        await deleteFromCloudinary(pid);
                    }
                }
            }

            const uploadedImages: string[] = [];
            const publicIds: string[] = [];

            for (const file of productImages) {
                if (file.size === 0) continue;
                const buffer = await file.arrayBuffer();
                const base64Image = `data:${file.type};base64,${Buffer.from(buffer).toString('base64')}`;
                const result = await uploadToCloudinary(base64Image, 'products');
                uploadedImages.push(result.secure_url);
                publicIds.push(result.public_id);
            }

            product.productImage = uploadedImages;
            product.cloudinaryPublicId = publicIds;
        }

        await product.save();

        return NextResponse.json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });

    } catch (error: any) {
        console.error('Update Product Error:', error);
        return NextResponse.json({ success: false, message: 'Server error while updating product' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 403 });
        }

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        // Delete images from Cloudinary
        if (product.cloudinaryPublicId && product.cloudinaryPublicId.length > 0) {
            for (const pid of product.cloudinaryPublicId) {
                if (pid !== 'placeholder') {
                    await deleteFromCloudinary(pid);
                }
            }
        }

        await Product.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error: any) {
        console.error('Delete Product Error:', error);
        return NextResponse.json({ success: false, message: 'Server error while deleting product' }, { status: 500 });
    }
}
