export default function ContactHero() {
    return (
        <div className="mb-16">
            <div className="flex flex-col gap-4 max-w-3xl">
                <div className="flex items-center gap-3 text-primary font-bold tracking-widest text-sm uppercase">
                    <span className="w-8 h-[2px] bg-primary"></span>
                    Support Grid
                </div>
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-white">
                    Contact{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        Carnottix
                    </span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mt-2">
                    Questions about fitment, shipping, or collaborations? Signal the crew
                    below. We're on standby.
                </p>
            </div>
        </div>
    );
}
