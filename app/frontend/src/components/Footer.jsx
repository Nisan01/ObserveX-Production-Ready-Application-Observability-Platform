import { Bike, Instagram, Mail, MapPin, Phone } from 'lucide-react'

function Footer({ onNavigate }) {
  return (
    <footer className="mt-12 border-t border-[#1A1A1A]/10 bg-[#141210] text-[#F7F5F1] md:mt-16">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-12 md:py-16 lg:px-20">
        <div className="sm:col-span-2 md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-[#C8522C]">
              <Bike size={23} />
            </span>
            <span className="font-display text-xl italic tracking-[-0.02em] md:text-2xl">
              PedalCraft
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm font-light leading-6 text-[#F7F5F1]/50">
            A focused bike store for riders who want clear specs, quality
            builds, and fast shopping without the clutter.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8522C]">
            Explore
          </h3>
          <div className="mt-4 grid gap-2.5 text-sm text-[#F7F5F1]/60">
            {['home', 'shop', 'about'].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => onNavigate(page)}
                className="w-fit capitalize transition duration-300 hover:text-[#C8522C]"
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8522C]">
            Contact
          </h3>
          <div className="mt-4 grid gap-3 text-sm text-[#F7F5F1]/60">
            <span className="flex items-center gap-2.5">
              <MapPin size={16} className="shrink-0 text-[#C8522C]/70" />
              Kathmandu showroom
            </span>
            <span className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-[#C8522C]/70" />
              +977 980-000-0000
            </span>
            <span className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-[#C8522C]/70" />
              hello@pedalcraft.test
            </span>
            <span className="flex items-center gap-2.5">
              <Instagram size={16} className="shrink-0 text-[#C8522C]/70" />
              @pedalcraft
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
