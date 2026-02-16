

export default function RegisterPromo() {
    return (
        <div className="hidden lg:flex lg:col-span-5 relative rounded-2xl overflow-hidden border border-border-dark group h-full min-h-[700px]">
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVGn9tr089uFAnCTFL8UVlkUrTjR61DE5DpLA2oOGtOvLeGtsDevc2B3rmEEs8-QTlJTpvYRq8_tPksYXk4pIfyj0VYMmwhScWkZv7wVAc1qgBLO3ikRBSKP_kXOS9wNNli_DsUSrDKPO7WSJS7CPXwrGjvuKbFh099f3HlURlxK25HElzHMydmdJp4woMjutLVudfJoE3JWTHHs6EOBXJSZ8WEWcTPSEThDapWEGCxPLv5-3vCIPvxya_1aWxwi35HvuSP7uZLG8')",
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10 z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-[2px] w-12 bg-primary"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        Join the Movement
                    </span>
                </div>
                <h2 className="text-4xl font-extrabold uppercase italic tracking-tight leading-none mb-4 text-white">
                    Speed.<br />
                    Style.<br />
                    Culture.
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                    Create an account to unlock exclusive drops, track your
                    high-performance orders, and join the global Carnottix community.
                </p>
                <div className="mt-8 flex gap-4">
                    <div className="flex -space-x-3">
                        <img
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-black"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg16Sxg6QL1Dfd3krjmT6dmVtfpUDi4Sd3TPrgbcWzj1zvQFGq3Ee00jT63KH8ZRqQH9MQ6cvXBtcW3a60AgVN5Jq5IMzKaGNC5_2vddKChltOax8Qq5_KpoxJKwth62okL8B5s1BZCeVgm3-WEU7rOGaRsBiyhxG9MP9AQJF--8Hc0DIDfG6uAbeXG7gMg7lC5UsLWtPrcWbv26TjsG1NzfFoL2WzFZHbjmGvcZ8PjV7lwxXrHoN3srfSRxBu91hDjQ-057NfhWg"
                        />
                        <div className="w-10 h-10 rounded-full border-2 border-black bg-surface-dark flex items-center justify-center text-[10px] font-bold text-white">
                            MJ
                        </div>
                        <img
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-black"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7EwXZc8IVups7okkLsQnIheaMFnNyR2eu-OeHtAd448Y42JyBHWBHDHAuNN8HBOLxW66Pw7CtHU8ksRTfNFcIbnY4j8F81ZmEE3grJ_W6MZPDDh1yg8Hx-QKlACod7UuYzwCw51PCVcXUbQOgq4CsUZzCWvMyjqo83HzEr2S1DNrl9l_gGekcWWLeI57grQF1pt8-_Eve_H1RD9HKgXXMUgPjU7TUjIwPjmcr52A8MFexsAKxjVF1kuXvmQho35YIAnwrav0-dF8"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold text-white">12k+ Members</span>
                        <span className="text-[10px] text-gray-400">
                            Verified Enthusiasts
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
