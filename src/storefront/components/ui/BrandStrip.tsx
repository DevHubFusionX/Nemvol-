export default function BrandStrip() {
  return (
    <section className="bg-white border-y border-stone-100 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col gap-4">
        <span className="block w-8 h-px bg-stone-300 mx-auto" />
        <p className="text-2xl md:text-3xl font-extralight text-stone-900 leading-relaxed tracking-tight">
          Crafted with intention.<br />Made to last.
        </p>
        <p className="text-sm text-stone-400 leading-relaxed max-w-md mx-auto">
          Every product in our collection is selected for quality, longevity, and minimal impact. We believe less is always more.
        </p>
        <span className="block w-8 h-px bg-stone-300 mx-auto" />
      </div>
    </section>
  )
}
