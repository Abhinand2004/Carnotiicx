import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Music from '@/models/Music';
import { getAuthUser } from '@/lib/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const decoded = getAuthUser(req);
        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        const music = await Music.findById(id);
        if (!music) {
            return NextResponse.json({ success: false, message: 'Music not found' }, { status: 404 });
        }

        if (music.cloudinaryPublicId) {
            console.log(`[DELETE MUSIC] Cleaning up Cloudinary asset for music ${id}:`, music.cloudinaryPublicId);
            try {
                const result = await deleteFromCloudinary(music.cloudinaryPublicId);
                console.log(`[DELETE MUSIC] Deleted asset ${music.cloudinaryPublicId}:`, result);
            } catch (error) {
                console.error(`[DELETE MUSIC] Failed to delete asset ${music.cloudinaryPublicId}:`, error);
            }
        }

        await Music.findByIdAndDelete(id);
        console.log(`[DELETE MUSIC] Successfully deleted music ${id} from database`);

        return NextResponse.json({ success: true, message: 'Music deleted successfully' });
    } catch (error: any) {
        console.error('Admin Music Delete Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
