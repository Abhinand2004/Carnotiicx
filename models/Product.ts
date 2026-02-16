import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    color: {
        type: [String],
        required: [true, 'At least one color is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: {
            values: ['car', 'bike', 'f1'],
            message: 'Type must be one of: car, bike, f1'
        }
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100']
    },
    productImage: {
        type: [String],
        required: [true, 'At least one product image is required']
    },
    cloudinaryPublicId: {
        type: [String],
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Calculate discounted price
productSchema.virtual('discountedPrice').get(function () {
    if (this.discountPercentage > 0) {
        return this.price * (1 - this.discountPercentage / 100);
    }
    return this.price;
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
