import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const easing = {
  outExpo: [0.16, 1, 0.3, 1],
};

function ProductCard({ bike, onAdd, dark = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: easing.outExpo }}
      className={`group flex h-full flex-col overflow-hidden border transition duration-500 ${
        dark
          ? 'border-[#F7F5F1]/12 bg-[#1A1815] hover:border-[#C8522C]/50'
          : 'border-[#1A1A1A]/10 bg-white hover:border-[#C8522C]/40'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={bike.image}
          alt={bike.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {bike.badge && (
          <span
            className={`absolute left-3 top-3 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] md:left-4 md:top-4 md:px-3 md:py-1.5 md:text-[10px] md:tracking-[0.18em] ${
              dark
                ? 'bg-[#C8522C] text-[#F7F5F1]'
                : 'bg-[#1A1A1A] text-[#F7F5F1]'
            }`}
          >
            {bike.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 md:gap-3">
          <div>
            <p
              className={`text-[9px] font-semibold uppercase tracking-[0.2em] md:text-[10px] md:tracking-[0.22em] ${
                dark ? 'text-[#C8522C]' : 'text-[#5C5550]'
              }`}
            >
              {bike.category}
            </p>
            <h3
              className={`font-display mt-1 text-lg font-light tracking-[-0.02em] md:mt-1.5 md:text-xl ${
                dark ? 'text-[#F7F5F1]' : 'text-[#1A1A1A]'
              }`}
            >
              {bike.name}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-1 md:gap-1.5">
            <Star
              size={13}
              className="text-[#C8522C] md:hidden"
              fill="currentColor"
            />
            <Star
              size={14}
              className="hidden text-[#C8522C] md:block"
              fill="currentColor"
            />
            <span
              className={`text-xs font-medium md:text-sm ${
                dark ? 'text-[#F7F5F1]/80' : 'text-[#1A1A1A]/70'
              }`}
            >
              {bike.rating}
            </span>
          </div>
        </div>

        <p
          className={`mt-1.5 text-xs font-light leading-5 md:mt-2 md:text-[13px] ${
            dark ? 'text-[#F7F5F1]/60' : 'text-[#5C5550]'
          }`}
        >
          {bike.terrain}
        </p>

        {/* Specs */}
        <ul className="mt-3 flex flex-wrap gap-1 md:mt-4 md:gap-1.5">
          {bike.specs.map((spec) => (
            <li
              key={spec}
              className={`border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] md:px-2.5 md:py-1 md:text-[10px] md:tracking-[0.12em] ${
                dark
                  ? 'border-[#F7F5F1]/15 text-[#F7F5F1]/60'
                  : 'border-[#1A1A1A]/12 text-[#5C5550]'
              }`}
            >
              {spec}
            </li>
          ))}
        </ul>

        {/* Colors */}
        {bike.colors && (
          <div className="mt-2.5 flex items-center gap-2 md:mt-3">
            {bike.colors.map((color) => (
              <span
                key={color}
                className={`text-[9px] font-medium uppercase tracking-[0.12em] md:text-[10px] md:tracking-[0.14em] ${
                  dark ? 'text-[#F7F5F1]/45' : 'text-[#5C5550]/70'
                }`}
              >
                {color}
              </span>
            ))}
          </div>
        )}

        {/* Price + Add */}
        <div className="mt-auto flex items-end justify-between pt-4 md:pt-5">
          <div>
            <p
              className={`text-[9px] font-medium uppercase tracking-[0.18em] md:text-[10px] md:tracking-[0.2em] ${
                dark ? 'text-[#F7F5F1]/40' : 'text-[#5C5550]/70'
              }`}
            >
              From
            </p>
            <p
              className={`font-display text-xl font-light tracking-[-0.02em] md:text-2xl ${
                dark ? 'text-[#F7F5F1]' : 'text-[#1A1A1A]'
              }`}
            >
              {currency.format(bike.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAdd(bike)}
            className={`inline-flex h-10 w-10 items-center justify-center transition duration-500 md:h-11 md:w-11 ${
              dark
                ? 'bg-[#C8522C] text-[#F7F5F1] hover:bg-[#F7F5F1] hover:text-[#1A1A1A]'
                : 'bg-[#1A1A1A] text-[#F7F5F1] hover:bg-[#C8522C]'
            }`}
            aria-label={`Add ${bike.name} to cart`}
            title="Add to cart"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
