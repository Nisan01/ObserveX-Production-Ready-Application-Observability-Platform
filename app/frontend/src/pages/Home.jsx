import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import ProductCard from '../components/ProductCard'

const easing = {
  outExpo: [0.16, 1, 0.3, 1],
}

const atelierNotes = [
  {
    number: '01',
    title: 'Frame first',
    text: 'We begin with geometry, terrain, and rider posture before talking color or accessories.',
    caption: 'Fit',
  },
  {
    number: '02',
    title: 'Parts with a reason',
    text: 'Every drivetrain, brake, tire, and finishing kit has a clear job in the build.',
    caption: 'Spec',
    spotlight: true,
  },
  {
    number: '03',
    title: 'Setup before delivery',
    text: 'Each cycle leaves tuned, checked, and packed with the notes you need for first ride confidence.',
    caption: 'Ready',
  },
]

function Home({ featuredBikes, onAdd, onShop }) {
  const heroRef = useRef(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const headlineY = useTransform(scrollYProgress, [0, 0.7], ['0%', '-10%'])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.25])

  return (
    <main>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="surface-noise relative overflow-hidden bg-[#F7F5F1] text-[#1A1A1A]"
      >
        {/* Background gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 58% at 18% 22%, rgba(200, 82, 44, 0.1) 0%, transparent 58%)',
          }}
        />

        {/* Ghost numeral */}
        <motion.div
          aria-hidden
          style={{
            y: prefersReduced ? '0%' : headlineY,
            opacity: prefersReduced ? 1 : headlineOpacity,
          }}
          className="pointer-events-none absolute -right-16 top-28 hidden select-none font-display text-[28rem] font-light italic leading-none tracking-[-0.08em] text-[#1A1A1A]/[0.045] lg:block"
        >
          02
        </motion.div>

        {/* ── Mobile layout: stacked (image top, text bottom) ── */}
        <div className="md:hidden">
          {/* Mobile hero image */}
          <div className="relative h-[42svh] w-full overflow-hidden">
            <motion.div
              aria-hidden
              style={{ y: prefersReduced ? '0%' : imageY }}
              className="absolute inset-0"
            >
              <img
                src="/images/hero.jpg"
                alt="Cyclist riding a performance bike on a mountain road"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F1]/30 via-transparent to-[#F7F5F1]" />
            </motion.div>
          </div>

          {/* Mobile hero content */}
          <div className="flex flex-col items-start px-5 pb-12 pt-8">
            <MaskReveal>
              <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5C5550]">
                <span className="h-px w-6 bg-[#1A1A1A]/30" />
                <span>Kathmandu cycle atelier</span>
              </div>
            </MaskReveal>

            <h1 className="font-display mt-5 text-[clamp(2.8rem,12vw,5rem)] font-light leading-[0.9] tracking-[-0.055em] text-[#1A1A1A]">
              <MaskReveal delay={0.15}>Bicycles</MaskReveal>
              <MaskReveal delay={0.3}>
                <span className="block italic">with altitude.</span>
              </MaskReveal>
            </h1>

            <MaskReveal delay={0.48}>
              <p className="mt-5 max-w-[12rem] text-sm font-light leading-6 text-[#5C5550] sm:max-w-[14rem] md:max-w-md">
                PedalCraft edits performance cycles for real terrain, precise
                fit, and everyday confidence, from compact city streets to long
                mountain lines.
              </p>
            </MaskReveal>

            <div className="mt-8 flex flex-col items-start gap-5">
              <MaskReveal delay={0.65}>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={onShop}
                    className="group inline-flex h-12 items-center gap-3 bg-[#1A1A1A] px-5 text-xs font-medium text-[#F7F5F1] transition duration-500 hover:bg-[#C8522C]"
                  >
                    Enter the collection
                    <ArrowRight
                      size={16}
                      className="transition duration-500 group-hover:translate-x-1"
                    />
                  </button>
                  <a
                    href="#featured"
                    className="group relative inline-flex h-12 items-center text-xs font-medium text-[#1A1A1A]"
                  >
                    Featured builds
                    <span className="absolute bottom-3 left-0 h-px w-full origin-left bg-[#1A1A1A]/50 transition duration-500 group-hover:scale-x-0" />
                    <span className="absolute bottom-3 left-0 h-px w-full origin-left scale-x-0 bg-[#C8522C] transition duration-500 delay-150 group-hover:scale-x-100" />
                  </a>
                </div>
              </MaskReveal>

              <MaskReveal delay={0.78}>
                <div className="grid grid-cols-2 gap-6 text-[10px] font-medium uppercase tracking-[0.2em] text-[#5C5550]">
                  <span>
                    <span className="font-display block text-lg font-light italic normal-case tracking-normal text-[#1A1A1A]">
                      6
                    </span>
                    edited builds
                  </span>
                  <span>
                    <span className="font-display block text-lg font-light italic normal-case tracking-normal text-[#1A1A1A]">
                      24h
                    </span>
                    tune check
                  </span>
                </div>
              </MaskReveal>
            </div>
          </div>
        </div>

        {/* ── Desktop layout: side by side ── */}
        <div className="relative mx-auto hidden min-h-screen max-w-[90rem] md:flex md:flex-col md:justify-between md:px-12 md:pb-20 md:pt-40 lg:px-20">
          {/* Desktop hero image */}
          <motion.div
            aria-hidden
            style={{
              y: prefersReduced ? '0%' : imageY,
            }}
            className="absolute bottom-0 right-0 top-24 w-[52vw]"
          >
            <img
              src="/images/hero.jpg"
              alt="Cyclist riding a performance bike on a mountain road"
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5F1] via-[#F7F5F1]/40 to-transparent" />
            <div className="absolute inset-0 bg-[#0A0908]/10" />
          </motion.div>

          {/* Desktop hero content */}
          <motion.div
            style={{
              y: prefersReduced ? '0%' : headlineY,
              opacity: prefersReduced ? 1 : headlineOpacity,
            }}
            className="relative z-10 flex min-h-[76vh] flex-col justify-between pr-[48vw] lg:pr-[46vw]"
          >
            <MaskReveal>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550]">
                <span className="h-px w-8 bg-[#1A1A1A]/30" />
                <span>Kathmandu cycle atelier</span>
              </div>
            </MaskReveal>

            <div className="max-w-[62rem]">
              <h1 className="font-display text-[clamp(3.3rem,8vw,10rem)] font-light leading-[0.9] tracking-[-0.055em] text-[#1A1A1A]">
                <MaskReveal delay={0.15}>Bicycles</MaskReveal>
                <MaskReveal delay={0.3}>
                  <span className="block italic">with altitude.</span>
                </MaskReveal>
              </h1>

              <MaskReveal delay={0.48}>
                <p className="mt-8 max-w-md text-base font-light leading-7 text-[#5C5550] lg:text-lg">
                  PedalCraft edits performance cycles for real terrain, precise
                  fit, and everyday confidence, from compact city streets to long
                  mountain lines.
                </p>
              </MaskReveal>
            </div>

            <div className="mt-14 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
              <MaskReveal delay={0.65}>
                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={onShop}
                    className="group inline-flex h-14 items-center gap-3 bg-[#1A1A1A] px-7 text-sm font-medium text-[#F7F5F1] transition duration-500 hover:bg-[#C8522C]"
                  >
                    Enter the collection
                    <ArrowRight
                      size={18}
                      className="transition duration-500 group-hover:translate-x-1"
                    />
                  </button>
                  <a
                    href="#featured"
                    className="group relative inline-flex h-14 items-center text-sm font-medium text-[#1A1A1A]"
                  >
                    Featured builds
                    <span className="absolute bottom-3 left-0 h-px w-full origin-left bg-[#1A1A1A]/50 transition duration-500 group-hover:scale-x-0" />
                    <span className="absolute bottom-3 left-0 h-px w-full origin-left scale-x-0 bg-[#C8522C] transition duration-500 delay-150 group-hover:scale-x-100" />
                  </a>
                </div>
              </MaskReveal>

              <MaskReveal delay={0.78}>
                <div className="grid grid-cols-2 gap-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[#5C5550]">
                  <span>
                    <span className="font-display block text-xl font-light italic normal-case tracking-normal text-[#1A1A1A]">
                      6
                    </span>
                    edited builds
                  </span>
                  <span>
                    <span className="font-display block text-xl font-light italic normal-case tracking-normal text-[#1A1A1A]">
                      24h
                    </span>
                    tune check
                  </span>
                </div>
              </MaskReveal>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Atelier method ── */}
      <section className="surface-noise relative overflow-hidden bg-[#F7F5F1] px-4 py-16 sm:px-6 md:px-12 md:py-24 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5C5550] md:text-[11px] md:tracking-[0.25em]">
                <span className="h-px w-6 bg-[#1A1A1A]/30 md:w-8" />
                <span>Atelier method</span>
              </div>
              <p className="mt-5 max-w-sm text-sm font-light leading-6 text-[#5C5550] md:mt-7">
                A tighter way to buy: less catalog noise, more useful detail,
                and bikes selected for where they will actually be ridden.
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,5.8rem)] font-light leading-[0.94] tracking-[-0.04em]">
                <MaskReveal>Chosen like</MaskReveal>
                <MaskReveal delay={0.15}>
                  <span className="italic">a studio build.</span>
                </MaskReveal>
              </h2>
            </div>
          </div>

          <div className="border-t border-[#1A1A1A]/10">
            {atelierNotes.map((note, index) => (
              <FeatureRow key={note.number} note={note} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured builds ── */}
      <section
        id="featured"
        className="relative overflow-hidden bg-[#141210] px-4 py-16 text-[#F7F5F1] sm:px-6 md:px-12 md:py-24 lg:px-20 lg:py-36"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 80% 12%, rgba(200, 82, 44, 0.16) 0%, transparent 55%)',
          }}
        />
        <div className="relative mx-auto max-w-[90rem]">
          <div className="mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end md:gap-8">
            <div>
              <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#C8522C] md:text-[11px] md:tracking-[0.25em]">
                <span className="h-px w-6 bg-[#C8522C]/70 md:w-8" />
                <span>Featured builds</span>
              </div>
              <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,5.6rem)] font-light leading-[0.94] tracking-[-0.04em] md:mt-5">
                This week&apos;s most considered rides.
              </h2>
            </div>
            <button
              type="button"
              onClick={onShop}
              className="group inline-flex h-11 w-fit items-center gap-3 border border-[#F7F5F1]/25 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#F7F5F1] transition duration-500 hover:border-[#C8522C] md:h-12 md:px-5 md:text-[11px] md:tracking-[0.22em]"
            >
              See all
              <ArrowRight size={16} className="transition duration-500 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 mx-auto max-w-md sm:max-w-none">
            {featuredBikes.slice(0, 3).map((bike, index) => (
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, delay: index * 0.08, ease: easing.outExpo }}
              >
                <ProductCard bike={bike} onAdd={onAdd} dark />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function MaskReveal({ children, delay = 0 }) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) return <span className="block">{children}</span>

  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.25, delay, ease: easing.outExpo }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function FeatureRow({ note, index }) {
  if (note.spotlight) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.1, delay: index * 0.08, ease: easing.outExpo }}
        className="relative border-b border-[#1A1A1A]/10 bg-[#141210] px-4 py-10 text-[#F7F5F1] sm:px-6 md:px-12 md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 70% at 86% 50%, rgba(200, 82, 44, 0.18) 0%, transparent 58%)',
          }}
        />
        <div className="relative grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center md:gap-10">
          <div>
            <span className="font-display text-[clamp(3.5rem,10vw,8rem)] font-light leading-none tracking-[-0.05em]">
              {note.number}
            </span>
            <p className="font-display mt-2 text-lg font-light italic text-[#F7F5F1]/60 md:text-xl">
              {note.caption}
            </p>
          </div>
          <div>
            <h3 className="font-display text-[clamp(1.6rem,4.5vw,4rem)] font-light leading-none tracking-[-0.03em]">
              {note.title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm font-light leading-6 text-[#F7F5F1]/72 md:mt-6 md:text-base md:leading-7">
              {note.text}
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.05, delay: index * 0.08, ease: easing.outExpo }}
      className="group grid gap-3 border-b border-[#1A1A1A]/10 py-6 sm:grid-cols-2 sm:gap-4 md:grid-cols-12 md:items-baseline md:gap-8 md:py-14"
    >
      <span className="font-display text-3xl font-light leading-none tracking-[-0.04em] transition duration-500 group-hover:translate-x-1 sm:col-span-1 md:col-span-2 md:text-5xl md:group-hover:translate-x-2">
        {note.number}
      </span>
      <h3 className="font-display text-xl font-light tracking-[-0.02em] sm:col-span-1 md:col-span-4 md:text-3xl">
        {note.title}
      </h3>
      <p className="max-w-xl text-xs font-light leading-6 text-[#5C5550] sm:col-span-2 md:col-span-5 md:text-sm md:text-base">
        {note.text}
      </p>
      <span className="font-display text-xs italic text-[#5C5550] sm:col-span-1 sm:text-right md:col-span-1 md:text-sm">
        {note.caption}
      </span>
    </motion.div>
  )
}

export default Home
