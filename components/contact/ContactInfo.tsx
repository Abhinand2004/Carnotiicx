export default function ContactInfo() {
    return (
        <div className="lg:col-span-5 flex flex-col gap-6">
            {/* WhatsApp Card */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-green-500/50 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div>
                        <h3 className="text-white font-bold text-lg uppercase">
                            Rapid Response
                        </h3>
                        <p className="text-gray-400 text-sm">Need an answer now?</p>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-full">
                        <span className="text-green-500 text-2xl material-symbols-outlined">
                            chat
                        </span>
                    </div>
                </div>
                <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold h-12 rounded-lg flex items-center justify-center gap-2 transition-colors relative z-10">
                    <span className="material-symbols-outlined text-xl">forum</span>
                    Chat on WhatsApp
                </button>
                {/* Decorative background icon */}
                <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-[120px] text-white/5 rotate-12 group-hover:text-green-500/10 transition-colors pointer-events-none select-none">
                    chat
                </span>
            </div>

            {/* Email Card */}
            <div className="bg-card-dark border border-white/10 rounded-xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold uppercase text-sm">
                            Direct Email
                        </h3>
                        <p className="text-gray-400 text-xs">For lengthy specs & files</p>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-input-dark rounded-lg px-4 py-3 border border-white/10 group cursor-pointer hover:border-primary/50 transition-colors">
                    <span className="text-white font-mono text-sm truncate">
                        support@carnotix.com
                    </span>
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors text-sm">
                        content_copy
                    </span>
                </div>
            </div>

            {/* Visual / Map Placeholder */}
            <div className="relative h-64 w-full rounded-xl overflow-hidden border border-white/10 group">
                <div
                    aria-label="Detailed close-up of a red sports car engine bay in low light"
                    className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-500 scale-105 group-hover:scale-110"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbMViW2bGOta7StQbAv0BCrgX5P5pd_zZ3r5-k1exTtDg4jgx963OJqdK12T0MfRDWUh83pnHqPkhIHrjcJVOwVu88DBFL9hc7Szh_gYOzSj1FZq7qXBojqTtC6wpAx5_xeVjhqqRvJrdQY8q2PqIexdxDIosvYZ7VpV348lMxTTcU_ZvGpLZD0CvtOgs4yImH7P5tk8yHoINwgQBM5bQP-7Yizjnc1U9CdDa0G7RkOT_aPTItpe7LA8jUWVeiVEocFx_kb8MmYBw')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                    <h3 className="text-white font-bold text-xl uppercase tracking-wider">
                        HQ Garage
                    </h3>
                    <p className="text-gray-300 text-sm">Los Angeles, CA</p>
                </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-2">
                <a
                    className="flex-1 bg-card-dark hover:bg-input-dark border border-white/10 h-12 rounded-lg flex items-center justify-center text-white transition-colors"
                    href="#"
                >
                    <span className="font-bold text-xs uppercase tracking-wider">
                        Instagram
                    </span>
                </a>
                <a
                    className="flex-1 bg-card-dark hover:bg-input-dark border border-white/10 h-12 rounded-lg flex items-center justify-center text-white transition-colors"
                    href="#"
                >
                    <span className="font-bold text-xs uppercase tracking-wider">
                        TikTok
                    </span>
                </a>
            </div>
        </div>
    );
}
