export default function Ticker() {
  return (
    <div className="bg-primary w-full overflow-hidden py-3 transform -skew-y-1 origin-left relative z-10 border-y-4 border-black">
      <div className="whitespace-nowrap flex gap-8 items-center justify-center font-black text-black italic tracking-tighter text-xl">
        {Array(3)
          .fill([
            "/// TOP DEALS",
            "/// FREE SHIPPING ON ORDERS OVER ₹150",
            "/// NEW DROP: MIDNIGHT RUNNER",
            "/// LIMITED EDITION",
          ])
          .flat()
          .map((text, i) => (
            <span key={i}>{text}</span>
          ))}
      </div>
    </div>
  );
}
