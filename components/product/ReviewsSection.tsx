import { useState } from "react";
import { api, getUserToken } from "@/lib/api";

export default function ReviewsSection({ product, onReviewAdded }: { product: any; onReviewAdded: () => void }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showForm, setShowForm] = useState(false);

    const token = typeof window !== 'undefined' ? getUserToken() : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setMessage({ type: 'error', text: 'Please login to write a review' });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await api.submitReview(product._id, { rating, comment }, token);
            if (response.success) {
                setMessage({ type: 'success', text: 'Review submitted successfully!' });
                setComment("");
                setRating(5);
                setShowForm(false);
                onReviewAdded();
            } else {
                setMessage({ type: 'error', text: response.message || 'Failed to submit review' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="border-t border-white/10 pt-16 mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">
                        Customer Reviews
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="text-5xl font-extrabold text-white">
                            {product.rating ? product.rating.toFixed(1) : "0.0"}
                        </div>
                        <div>
                            <div className="flex text-primary text-lg mb-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <span
                                        key={i}
                                        className="material-symbols-outlined filled"
                                        style={{ fontVariationSettings: i <= Math.round(product.rating || 0) ? "'FILL' 1" : "'FILL' 0" }}
                                    >
                                        {i <= Math.round(product.rating || 0) ? 'star' : 'star_outline'}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-gray-400">Based on {product.numReviews || 0} Reviews</p>
                        </div>
                    </div>
                </div>
                {token ? (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-surface-dark hover:bg-[#1e1e1e] border border-white/10 text-white px-6 py-3 rounded font-bold uppercase text-sm tracking-wider transition-colors"
                    >
                        {showForm ? "Cancel Review" : "Write a Review"}
                    </button>
                ) : (
                    <p className="text-sm text-gray-500 italic">Login to write a review</p>
                )}
            </div>

            {showForm && (
                <div className="mb-12 bg-surface-dark p-6 rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-4">
                    <h4 className="font-bold uppercase tracking-wider mb-4">Share Your Experience</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        className={`size-10 rounded border flex items-center justify-center transition-all ${rating >= s ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-gray-500 hover:border-gray-400"
                                            }`}
                                    >
                                        <span className="material-symbols-outlined filled" style={{ fontVariationSettings: rating >= s ? "'FILL' 1" : "'FILL' 0" }}>
                                            star
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Your Review</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white text-sm focus:border-primary outline-none transition-colors"
                                placeholder="What did you think of the gear?"
                            ></textarea>
                        </div>
                        {message && (
                            <div className={`p-3 rounded text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {message.text}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-red-600 text-white font-bold uppercase py-3 px-8 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Post Review"}
                        </button>
                    </form>
                </div>
            )}


            {/* Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review: any, i: number) => (
                        <div
                            key={review._id || i}
                            className="bg-surface-dark p-6 rounded-lg border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xs">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-white text-sm">{review.name}</h5>
                                        <span className="text-xs text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">
                                                verified
                                            </span>{" "}
                                            Verified Buyer
                                        </span>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex text-primary text-sm mb-3">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span
                                        key={s}
                                        className="material-symbols-outlined filled text-[16px]"
                                        style={{ fontVariationSettings: s <= review.rating ? "'FILL' 1" : "'FILL' 0" }}
                                    >
                                        {s <= review.rating ? 'star' : 'star_outline'}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center bg-surface-dark rounded-lg border border-dashed border-white/10">
                        <p className="text-gray-500">No reviews yet. Be the first to gear up and review!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
