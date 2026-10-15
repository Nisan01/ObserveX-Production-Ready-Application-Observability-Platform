import { Gauge, HeartHandshake, Map, Trophy } from 'lucide-react'

function About() {
  return (
    <main className="mx-auto max-w-[90rem] px-4 pb-16 pt-24 sm:px-6 md:px-12 md:pt-40 md:pb-24 lg:px-20">
      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-12">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5C5550] md:text-[11px] md:tracking-[0.25em]">
            <span className="h-px w-6 bg-[#1A1A1A]/30 md:w-8" />
            <span>About PedalCraft</span>
          </div>
          <h1 className="font-display mt-5 text-[clamp(2.2rem,5.5vw,5.5rem)] font-light leading-[0.94] tracking-[-0.04em] text-[#1A1A1A] md:mt-6">
            A bike shop built around useful choices.
          </h1>
          <p className="mt-5 max-w-xl text-sm font-light leading-6 text-[#5C5550] md:mt-7 md:text-base md:leading-7 lg:text-lg">
            PedalCraft keeps the catalog tight and practical. Each bike is
            presented with terrain, core components, and the details riders
            actually compare before buying.
          </p>
        </div>
        <img
          src="/images/about.jpg"
          alt="Bike mechanic preparing a bicycle wheel"
          className="aspect-[4/3] w-full object-cover"
        />
      </section>

      {/* Value cards */}
      <section className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-20 md:gap-4 lg:grid-cols-4">
        {[
          ['Curated range', 'Road, gravel, trail, electric, and city bikes.', Map],
          ['Tested parts', 'Reliable drivetrains, brakes, tires, and frames.', Gauge],
          ['Rider support', 'Clear setup guidance after purchase.', HeartHandshake],
          ['Quality first', 'No filler models just to pad the catalog.', Trophy],
        ].map(([title, text, Icon]) => (
          <div key={title} className="border border-[#1A1A1A]/10 bg-white p-4 transition duration-500 hover:border-[#C8522C]/40 md:p-6">
            <Icon className="text-[#C8522C]" size={24} />
            <h2 className="font-display mt-3 text-lg font-light tracking-[-0.01em] text-[#1A1A1A] md:mt-4 md:text-xl">{title}</h2>
            <p className="mt-1.5 text-xs font-light leading-6 text-[#5C5550] md:mt-2 md:text-sm">{text}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

export default About
