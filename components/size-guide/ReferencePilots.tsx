export default function ReferencePilots() {
    const pilots = [
        {
            id: "PILOT_01",
            size: "M",
            height: "175 CM",
            weight: "70 KG",
            build: "ATHLETIC",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK1Sn0NN39Kh8EViDHbT1p25EYdpEzlc51quXmMC1e84w6nMANaDhX7y55yQUpjimn-OuVT2na4PA-6grfMXYR7wqSGFCr6ZFEdypbKfB684U6IHyGqYizMHKcWnl114hALG-lfU_KSfbzNgllZ1aVF83nD2bcGa42UBk86Hiq5TM8pumm3UPvZP_65WXkf87Xs592dzT5iomLKPvQjmxzkNMsmP3ufQFAgLC_HsKFqdA4TCcXaJbW345NyrwDClhA_xH0ANPnps4",
            alt: "Male model 175cm tall wearing size Medium t-shirt, standing straight",
        },
        {
            id: "PILOT_02",
            size: "L",
            height: "183 CM",
            weight: "82 KG",
            build: "MUSCULAR",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmXUozDE36f86oLD41ydnPVEa7tOsi2qo0CPTSMlLUIJUbvB2ZjAPQVRTU-XH2Kwbm0Rec0vBK_hpLOsYuhzRU0tC7zE0ueKxgv9R7CHtVV954WFEQ4eXPrRbK4uHeUgYI6cHrYAXD1vLrzLELi4wwVmaOQoKmtclqF4OpUhzV6eDnOjhgqmE4JrJ7be0HZEN7EmLXIoal1Zq-c92EKeWOkhywhxdVkYJDW8A7LvhBxl0sFPOCzrJ7HLbksH2lCC-Xou3amUc5pzI",
            alt: "Male model 183cm tall wearing size Large t-shirt, street style pose",
        },
        {
            id: "PILOT_03",
            size: "XL",
            height: "190 CM",
            weight: "95 KG",
            build: "BROAD",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCXu_SRLdJ1a1wJgRwJd20S7Ab4jiirI1Et6O6mgMMmqemZSumXFtvvMCXOUdth6UlLWXWcIaM9NiCEQkCAAMHlmWPSge5p9x8ksK1lOykPdA1LhmajLL8Qjn4_CySFZmwg8FDxgJCJdj-agNIf8oipzkhnhWKbeyrUOfFI6YhofvPLmwkwNW0Iok5dYY57sYGBBxAY0fchOVBJj_gn3MibTIOSuEncJokquOLpWfh_R0MNlq8rikUtjim-iHn4WDFIcMJncyYO6I",
            alt: "Male model 190cm tall wearing size XL t-shirt, studio lighting",
        },
    ];

    return (
        <section className="px-6 pb-20 lg:px-40">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-white text-2xl font-bold uppercase tracking-tight mb-8 border-l-4 border-primary pl-4">
                    Reference Pilots
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pilots.map((pilot) => (
                        <div
                            key={pilot.id}
                            className="group relative rounded-lg overflow-hidden border border-border-dark aspect-[3/4]"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                role="img"
                                aria-label={pilot.alt}
                                style={{ backgroundImage: `url('${pilot.img}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                            {/* HUD Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div
                                    className="p-4 rounded text-sm text-white shadow-lg"
                                    style={{
                                        background: "rgba(34, 17, 18, 0.85)",
                                        backdropFilter: "blur(4px)",
                                        borderLeft: "2px solid #ea2a33",
                                    }}
                                >
                                    <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-2">
                                        <span className="font-mono text-primary font-bold">
                                            {pilot.id}
                                        </span>
                                        <span className="font-bold text-lg">SIZE: {pilot.size}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-1 text-xs text-text-muted font-mono">
                                        <span>HEIGHT:</span>
                                        <span className="text-white text-right">
                                            {pilot.height}
                                        </span>
                                        <span>WEIGHT:</span>
                                        <span className="text-white text-right">
                                            {pilot.weight}
                                        </span>
                                        <span>BUILD:</span>
                                        <span className="text-white text-right">{pilot.build}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
