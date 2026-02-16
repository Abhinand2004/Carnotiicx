export default function PromoBanner() {
  return (
    <div className="my-12 relative w-full h-[300px] rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="relative h-full flex flex-col justify-center px-8 max-w-2xl">
        <span className="text-primary font-bold uppercase mb-2">
          Coming Soon
        </span>
        <h2 className="text-4xl font-black italic uppercase mb-4">
          The Nürburgring Collection
        </h2>
        <button className="w-fit bg-white text-black px-6 py-3 rounded font-bold uppercase hover:bg-primary hover:text-white transition-colors">
          Get Notified
        </button>
      </div>
    </div>
  );
}
