export default function SizeExplainer() {
    return (
        <section className="bg-[#1a0d0e] border-y border-border-dark px-6 py-16 lg:px-40">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-white text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">
                                architecture
                            </span>
                            Oversized Architecture
                        </h2>
                        <p className="text-text-muted mb-8 leading-relaxed">
                            Our signature "Street-Spec" fit is designed with a dropped
                            shoulder seam and a wider chest box. This creates a modern,
                            relaxed drape that doesn't cling, allowing for maximum mobility
                            and ventilation.
                        </p>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded flex items-center justify-center bg-card-dark border border-border-dark text-primary shrink-0">
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_outward
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-sm">
                                        Dropped Shoulders
                                    </h4>
                                    <p className="text-text-muted text-sm mt-1">
                                        Seams sit lower on the arm for a relaxed, boxy aesthetic.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded flex items-center justify-center bg-card-dark border border-border-dark text-primary shrink-0">
                                    <span className="material-symbols-outlined text-sm">
                                        fit_screen
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-sm">
                                        Boxy Chest & Torso
                                    </h4>
                                    <p className="text-text-muted text-sm mt-1">
                                        Wider cut through the midsection. Not tapered.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded flex items-center justify-center bg-card-dark border border-border-dark text-primary shrink-0">
                                    <span className="material-symbols-outlined text-sm">
                                        texture
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-sm">
                                        Heavyweight Cotton
                                    </h4>
                                    <p className="text-text-muted text-sm mt-1">
                                        280GSM fabric maintains structure and silhouette shape.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2 relative">
                        {/* Diagram Visual */}
                        <div className="relative w-full aspect-square bg-card-dark rounded-xl border border-border-dark p-8 flex items-center justify-center">
                            <div className="absolute top-4 left-4 text-xs font-mono text-primary uppercase">
                                Figure 1.1 // Schematic
                            </div>
                            {/* Abstract T-shirt wireframe representation using CSS/HTML shapes/borders or placeholder */}
                            <div
                                className="relative w-3/4 h-3/4 bg-contain bg-center bg-no-repeat opacity-80"
                                role="img"
                                aria-label="Wireframe schematic drawing of a t-shirt showing dimensional measurements with red arrows"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWeLpPncaQb1WawUhqdDEOSQByVB4dg3UIlCYRv_2ualiOHsfcyXzLeJTcuQh_aGeLpBFTy4Xji0yeC6TkKOANSRSqhyngqvXwIQLlFeFvmOSJ5y5C7KZHj7VqXyNmc6BlIvMOY0eC4BgDAsHGXOtAGJagGJNlzxJWyNiEW4c9QxQvTsCv0WoJ7vNA2oXaedeo8_qrJF6bADUAmnjwsl8NLZ4eFvzVA-1h2mBf7BmWHeQdjzXHH65nHaT7_iKG-7dpXhVCml8Ydu4')",
                                    filter: "invert(1) grayscale(1) brightness(2)",
                                }}
                            ></div>
                            {/* Overlay Lines for effect */}
                            <div className="absolute top-1/2 left-0 w-full h-px bg-primary/20"></div>
                            <div className="absolute left-1/2 top-0 w-px h-full bg-primary/20"></div>
                            <div className="absolute top-[20%] right-[15%] text-right">
                                <div className="text-primary text-xs font-bold font-mono">
                                    SHOULDER
                                </div>
                                <div className="w-16 h-px bg-primary mt-1"></div>
                            </div>
                            <div className="absolute bottom-[20%] left-[15%] text-left">
                                <div className="text-primary text-xs font-bold font-mono">
                                    HEM
                                </div>
                                <div className="w-16 h-px bg-primary mt-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
