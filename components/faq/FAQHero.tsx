export default function FAQHero() {
    return (
        <div className="w-full relative overflow-hidden bg-black">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-background-dark z-10"></div>
                <div
                    className="w-full h-full bg-cover bg-center opacity-40 grayscale"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRmfNgEA-jeSbd3yzdcoSnKm1PRLK9JO6-jhWnDDgXsg9XoQ718QtYuq01vR1V2SG6Exo1Q8i6z3cQ4gTxYz6ayhwzCqVptprpBfUPh97emZauZUBZovUD8uRycesZEZanDi9x_qgc13XoLLinrDWoqaiiPT6vIcWmpKO_tvWnW3vSVe24hRFTMiP_Db3sxHd3WWcVpjFCRYrlzsvsIN39U8ATNjI3PXfX6RryTcGSMPGyueaiANjU_h1Wj6fIr1AZVK2-GSWwSIg')",
                    }}
                ></div>
            </div>
            <div className="relative z-20 w-full max-w-[960px] mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center gap-8">
                <div className="flex flex-col gap-4 animate-fade-in">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase">
                        Support Center
                    </span>
                    <h1 className="text-white text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase italic">
                        Frequently
                        <br />
                        Asked Questions
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto font-light tracking-wide">
                        Find answers regarding shipping, limited drops, fabric details, and
                        product care instructions.
                    </p>
                </div>
                {/* Search Box */}
                <div className="w-full max-w-md relative group">
                    <input
                        className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary backdrop-blur-sm transition-all"
                        placeholder="Search for answers..."
                        type="text"
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        search
                    </span>
                </div>
            </div>
        </div>
    );
}
