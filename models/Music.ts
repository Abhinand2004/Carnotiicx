import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Music title is required'],
        trim: true
    },
    url: {
        type: String,
        required: [true, 'Music URL is required']
    },
    cloudinaryPublicId: {
        type: String,
        required: [true, 'Cloudinary Public ID is required']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Music = mongoose.models.Music || mongoose.model('Music', musicSchema);

export default Music;
