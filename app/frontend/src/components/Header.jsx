import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const easing = {
  outExpo: [0.16, 1, 0.3, 1],
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'about', label: 'About' },
]

function Header({ activePage, cartCount, onCartOpen, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navigate = (page) => {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="absolute inset-0 -z-10 bg-[#F7F5F1]/88 backdrop-blur-md"
        />

        <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-4 md:h-24 md:px-12 lg:px-20">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="group flex items-center gap-2 text-left md:gap-3"
            aria-label="Go to home"
          >
            <span className="font-display text-lg italic leading-none tracking-[-0.02em] text-[#1A1A1A] md:text-2xl">
              PedalCraft
            </span>
            <span className="hidden h-4 w-px bg-[#1A1A1A]/20 md:block" />
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.25em] text-[#5C5550] md:inline">
              Atelier Cycles
            </span>
          </button>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className="group relative py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[#1A1A1A]"
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[#C8522C] transition-transform duration-500 ${
                    activePage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={onCartOpen}
              className="relative grid h-10 w-10 place-items-center border border-[#1A1A1A]/15 bg-[#F7F5F1]/80 text-[#1A1A1A] transition duration-500 hover:border-[#C8522C] md:h-11 md:w-11"
              aria-label="Open cart"
              title="Open cart"
            >
              <ShoppingBag size={18} strokeWidth={1.7} className="md:hidden" />
              <ShoppingBag size={19} strokeWidth={1.7} className="hidden md:block" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center bg-[#C8522C] px-1 text-[10px] font-semibold text-[#F7F5F1] md:h-6 md:min-w-6 md:text-[11px]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center border border-[#1A1A1A]/15 bg-[#F7F5F1]/80 text-[#1A1A1A] md:hidden md:h-11 md:w-11"
              aria-label="Toggle menu"
              title="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="h-px w-full bg-[#1A1A1A]/12"
        />
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu activePage={activePage} onNavigate={navigate} />}
      </AnimatePresence>
    </>
  )
}

function MobileMenu({ activePage, onNavigate }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: prefersReduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easing.outExpo }}
      className="fixed inset-0 z-30 bg-[#F7F5F1] md:hidden"
    >
      <nav className="flex h-full flex-col justify-center px-6 pt-16">
        {navItems.map((item, index) => (
          <span key={item.id} className="overflow-hidden border-b border-[#1A1A1A]/10 py-4 md:py-5">
            <motion.button
              type="button"
              onClick={() => onNavigate(item.id)}
              initial={{ y: prefersReduced ? '0%' : '110%' }}
              animate={{ y: '0%' }}
              exit={{ y: prefersReduced ? '0%' : '110%' }}
              transition={{
                duration: 0.9,
                delay: index * 0.08,
                ease: easing.outExpo,
              }}
              className={`font-display block text-left italic tracking-[-0.03em] ${
                activePage === item.id ? 'text-[#C8522C]' : 'text-[#1A1A1A]'
              }`}
              style={{
                fontSize: 'clamp(2.5rem, 13vw, 6rem)',
                lineHeight: 0.95,
              }}
            >
              {item.label}
            </motion.button>
          </span>
        ))}
      </nav>
    </motion.div>
  )
}

export default Header
