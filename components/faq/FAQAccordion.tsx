export default function FAQAccordion() {
    const faqs = [
        {
            q: "How long does international shipping take?",
            a: "International orders are processed within 24-48 hours. Depending on your location and customs clearance, standard international shipping typically takes <span class='font-semibold text-white'>7-14 business days</span>. We use premium carriers to ensure your gear arrives in perfect condition.",
        },
        {
            q: "What is the return policy for limited drops?",
            a: 'Due to the exclusive nature of our drops, items marked as "Limited Edition" or "Final Sale" are not eligible for return unless defective. For standard collection items, we accept returns within <span class="font-semibold text-white">14 days</span> of delivery, provided the item is unworn and tags are attached.',
        },
        {
            q: "Are the hoodies heavyweight cotton?",
            a: "Yes. Our signature hoodies are crafted from <span class='font-semibold text-white'>450GSM French Terry cotton</span>. They are pre-shrunk and enzyme-washed for a vintage feel and superior durability right out of the box.",
        },
        {
            q: "How should I wash graphic tees?",
            a: "To preserve the puff print and high-density graphics, we recommend washing inside out with cold water on a gentle cycle. <span class='font-semibold text-white'>Hang dry only</span>. Do not iron directly on the print.",
        },
        {
            q: "Do you offer exchanges on sale items?",
            a: "Items purchased during promotional sales (Black Friday, End of Season) are final sale. However, size exchanges may be accommodated depending on inventory availability. Contact support immediately if you have sizing issues.",
        },
    ];

    return (
        <div className="w-full max-w-[960px] px-4 pb-20 flex flex-col gap-4">
            {faqs.map((item, i) => (
                <details
                    key={i}
                    className="group rounded-lg bg-white dark:bg-surface-dark border border-neutral-200 dark:border-white/10 open:border-primary dark:open:border-primary transition-all duration-300"
                    open={i === 0}
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between p-6 transition-colors">
                        <div className="flex items-center gap-4">
                            <span className="flex size-8 items-center justify-center rounded bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-gray-400 font-bold text-xs group-open:text-primary group-open:bg-primary/10 transition-colors">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-slate-900 dark:text-white text-base md:text-lg font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                                {item.q}
                            </h3>
                        </div>
                        <span className="material-symbols-outlined text-neutral-400 group-open:rotate-180 transition-transform duration-300 group-open:text-primary">
                            expand_more
                        </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-neutral-100 dark:bg-white/5 mb-4"></div>
                        <p
                            className="text-slate-600 dark:text-gray-400 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item.a }}
                        />
                    </div>
                </details>
            ))}
        </div>
    );
}
