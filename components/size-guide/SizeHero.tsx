export default function SizeHero() {
    return (
        <section className="relative px-6 py-12 lg:px-40 lg:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="order-2 lg:order-1 relative group overflow-hidden rounded-xl border border-border-dark bg-card-dark">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                        <div
                            className="w-full h-[400px] lg:h-[500px] bg-center bg-cover bg-no-repeat transform transition-transform duration-700 group-hover:scale-105"
                            role="img"
                            aria-label="Close up of a model wearing a black oversized streetwear t-shirt with red graphics"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8colSa9wazqhhfIHe2w3a9-oVI-cHC9NDeQaXAFMZvtBUQB7qwqsCF1x55gGVZEz4oLwZvE7JnrWRmg734lpkEwrKYcndT2hsePvHcsEBUFKN5T6F8vkxE7Gsn9g563eFu-YhIATqdE2z5OI5mOsB8feq7CMWDc1fb2nxJvk3JS6dJqLv52jUHzl6-8njcidxRXca1EIUivprowBFXgzAP6K80xAm8lOJebqFxCTG1c6-7knDu1wUKf1IDaVMty0D3sYvjHvJWcU")',
                            }}
                        ></div>
                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="inline-flex items-center gap-2 rounded bg-primary/20 px-2 py-1 backdrop-blur-md mb-2">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-xs font-bold text-primary tracking-widest uppercase">
                                    Live Data
                                </span>
                            </div>
                            <h3 className="text-white text-2xl font-bold uppercase tracking-tight">
                                Standard Issue Tee
                            </h3>
                            <p className="text-text-muted text-sm mt-1">
                                Version 2.0 // Carbon Black
                            </p>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 flex flex-col gap-6">
                        <div>
                            <h1 className="text-white text-5xl md:text-6xl font-black leading-none tracking-tighter uppercase mb-4">
                                Fitment
                                <br />
                                <span className="text-primary">Data_</span>
                            </h1>
                            <p className="text-text-muted text-lg font-light leading-relaxed max-w-md">
                                Analyze sizing specifications to ensure optimal chassis fitment.
                                Our garments are engineered for performance, airflow, and an
                                aggressive silhouette.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center h-12 px-8 bg-primary hover:bg-red-600 text-white font-bold tracking-wide uppercase rounded-lg transition-colors group">
                                <span>Return to Shop</span>
                                <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </button>
                            <button className="flex items-center justify-center h-12 px-8 bg-card-dark border border-border-dark text-white hover:bg-white/5 font-bold tracking-wide uppercase rounded-lg transition-colors">
                                <span>Contact Support</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-xs text-text-muted uppercase tracking-widest">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">
                                    straighten
                                </span>
                                <span>Precision Cut</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-border-dark"></div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">
                                    local_shipping
                                </span>
                                <span>Global Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
