import Link from "next/link";

export default function Hero({ categories, loading }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 tracking-widest uppercase">
        Precision CAD Assets
      </div>
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
        Professional AutoCAD <br className="hidden md:block" /> Designs for Every Scale.
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-lg px-2">
        Access high-quality floor plans, 3D models, and mechanical drawings. Ready-to-use for architects and engineers.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 px-6 sm:px-0">
        <Link href="/drawings?filter=premium" className="w-full sm:w-auto px-8 py-4 bg-blueprint-500 text-white rounded-md font-bold hover:bg-blueprint-300 transition-all text-sm md:text-base">
          Browse Premium
        </Link>
        <Link href="/drawings?filter=free" className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-md font-bold hover:bg-white/5 transition text-sm md:text-base">
          View Free Downloads
        </Link>
      </div>

      <div className="mt-12 md:mt-20 flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 overflow-x-auto pb-4 md:pb-0 hide-scrollbar px-4">
        {loading ? (
          <div className="h-8 w-24 bg-white/5 animate-pulse rounded-full"></div>
        ) : (
          categories.map((cat) => (
            <Link key={cat} href={`/drawings?category=${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-blueprint-700 text-[10px] md:text-xs text-gray-300 font-mono hover:border-blueprint-500 hover:text-white transition-all capitalize">
              {cat}
            </Link>
          ))
        )}
      </div>
    </section>
  );
}