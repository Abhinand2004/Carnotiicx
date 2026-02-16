export default function FAQCTA() {
    return (
        <div className="w-full bg-neutral-100 dark:bg-[#150a0a] border-t border-neutral-200 dark:border-white/10 py-20 px-4 mt-auto">
            <div className="max-w-[960px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                        Still Need Help?
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400">
                        Our support team is racing to get back to you.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-primary hover:bg-red-600 text-white font-bold h-12 px-8 rounded-lg uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(234,42,51,0.3)] hover:shadow-[0_0_25px_rgba(234,42,51,0.5)] flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        Contact Support
                    </button>
                    <button className="border border-neutral-300 dark:border-neutral-700 hover:border-slate-900 dark:hover:border-white text-slate-900 dark:text-white font-bold h-12 px-8 rounded-lg uppercase tracking-wide transition-all bg-transparent flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                        Live Chat
                    </button>
                </div>
            </div>
        </div>
    );
}
