"use client";

export default function ContactForm() {
    return (
        <div className="lg:col-span-7 bg-card-dark border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <form className="flex flex-col gap-6">
                {/* Row 1: Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-gray-300 text-sm font-semibold uppercase tracking-wide">
                            Racer Name
                        </span>
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-500 group-focus-within/input:text-primary transition-colors text-xl">
                                    badge
                                </span>
                            </div>
                            <input
                                className="w-full bg-input-dark border border-white/10 rounded-lg h-14 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
                                placeholder="Enter your name"
                                type="text"
                            />
                        </div>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-gray-300 text-sm font-semibold uppercase tracking-wide">
                            Contact Comms
                        </span>
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-500 group-focus-within/input:text-primary transition-colors text-xl">
                                    alternate_email
                                </span>
                            </div>
                            <input
                                className="w-full bg-input-dark border border-white/10 rounded-lg h-14 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
                                placeholder="Enter your email"
                                type="email"
                            />
                        </div>
                    </label>
                </div>
                {/* Row 2: Subject */}
                <label className="flex flex-col gap-2">
                    <span className="text-gray-300 text-sm font-semibold uppercase tracking-wide">
                        Subject
                    </span>
                    <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-500 group-focus-within/input:text-primary transition-colors text-xl">
                                tune
                            </span>
                        </div>
                        <select
                            defaultValue=""
                            className="w-full bg-input-dark border border-white/10 rounded-lg h-14 pl-12 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium appearance-none cursor-pointer"
                        >
                            <option disabled value="">
                                Select Inquiry Type
                            </option>
                            <option value="order">Order Support</option>
                            <option value="collab">Brand Collaboration</option>
                            <option value="fitment">Fitment Question</option>
                            <option value="other">Other Inquiry</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-500">
                                expand_more
                            </span>
                        </div>
                    </div>
                </label>
                {/* Row 3: Message */}
                <label className="flex flex-col gap-2">
                    <span className="text-gray-300 text-sm font-semibold uppercase tracking-wide">
                        Transmission
                    </span>
                    <div className="relative group/input">
                        <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                            <span className="material-symbols-outlined text-gray-500 group-focus-within/input:text-primary transition-colors text-xl">
                                chat_bubble_outline
                            </span>
                        </div>
                        <textarea
                            className="w-full bg-input-dark border border-white/10 rounded-lg min-h-[180px] pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium resize-none leading-relaxed"
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>
                </label>
                {/* Submit Button */}
                <button
                    className="mt-2 w-full bg-primary hover:bg-red-600 text-white font-bold h-14 rounded-lg uppercase tracking-wider transition-all duration-300 shadow-[0_4px_14px_0_rgba(234,42,51,0.39)] hover:shadow-[0_6px_20px_rgba(234,42,51,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                    type="button"
                >
                    <span>Initialize Send</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </button>
            </form>
        </div>
    );
}
