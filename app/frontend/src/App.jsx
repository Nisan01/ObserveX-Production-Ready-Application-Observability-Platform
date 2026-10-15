 
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import { bikes, categories } from './data/bikes';

const easing = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutExpo: [0.87, 0, 0.13, 1],
};

function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      const matchesCategory =
        activeCategory === 'All' || bike.category === activeCategory;
      const matchesQuery =
        bike.name.toLowerCase().includes(query.toLowerCase()) ||
        bike.terrain.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const addToCart = (bike) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === bike.id);
      if (existing) {
        return items.map((item) =>
          item.id === bike.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { id: bike.id, name: bike.name, price: bike.price, image: bike.image, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, direction) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + direction }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#1A1A1A]">
      <AnimatePresence>{introVisible && <IntroCycle />}</AnimatePresence>

      <Header
        activePage={activePage}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={setActivePage}
      />

      {activePage === 'home' && (
        <Home
          featuredBikes={bikes}
          onAdd={addToCart}
          onShop={() => setActivePage('shop')}
        />
      )}

      {activePage === 'shop' && (
        <ShopPage
          filteredBikes={filteredBikes}
          onAdd={addToCart}
          onFilterChange={setActiveCategory}
          onSearchChange={setQuery}
        />
      )}

      {activePage === 'about' && <About />}

      <Footer onNavigate={setActivePage} />

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        onUpdateQuantity={updateQuantity}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}

function ShopPage({ filteredBikes, onAdd, onFilterChange, onSearchChange }) {
  return (
    <main className="surface-noise relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 md:px-12 md:pb-24 md:pt-36 lg:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 18% 20%, rgba(200, 82, 44, 0.1) 0%, transparent 60%)',
        }}
      />

      <section className="relative mx-auto max-w-[90rem] border-b border-[#1A1A1A]/10 pb-8 md:pb-12">
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5C5550] md:text-[11px] md:tracking-[0.25em]">
              <span className="h-px w-6 bg-[#1A1A1A]/30 md:w-8" />
              <span>Built inventory</span>
            </div>
            <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.5rem,7vw,8rem)] font-light leading-[0.92] tracking-[-0.04em] text-[#1A1A1A] md:mt-6">
              Select the machine for your next line.
            </h1>
          </div>

          <div className="sm:pb-1 lg:pb-3">
            <SearchInput onSearchChange={onSearchChange} />
            <FilterOptions onFilterChange={onFilterChange} />
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-12">
        <ProductGrid products={filteredBikes} onAdd={onAdd} />
      </section>
    </main>
  );
}

function SearchInput({ onSearchChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} />
      <input
        type="text"
        placeholder="Search for bikes"
        className="w-full rounded-full border border-[#1A1A1A]/30 bg-white py-2.5 pl-10 pr-4 text-sm md:py-2"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

function FilterOptions({ onFilterChange }) {
  return (
    <div className="mt-3 md:mt-4">
      <label className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#5C5550] md:text-[11px] md:tracking-[0.25em]">
        Filter by category:
      </label>
      <select
        className="mt-1.5 w-full rounded-full border border-[#1A1A1A]/30 bg-white px-4 py-2.5 text-sm md:mt-1 md:py-2"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {products.map((bike) => (
        <ProductCard key={bike.id} bike={bike} onAdd={onAdd} />
      ))}
    </div>
  );
}

function WheelRing({ size, spokes, duration, reverse = false, borderWidth = 'border-2', borderColor = 'border-[#F7F5F1]/20', hubColor = 'bg-[#C8522C]', spokeColor = 'bg-[#F7F5F1]/8', delay = 0, scaleDelay = 0.9 }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className={`absolute rounded-full ${borderWidth} ${borderColor}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0.6, opacity: 0, rotate: reverse ? 60 : -60 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: prefersReduced ? 0 : reverse ? -360 : 360,
      }}
      transition={{
        scale: { duration: scaleDelay, delay, ease: easing.outExpo },
        opacity: { duration: 0.6 },
        rotate: prefersReduced
          ? { duration: 0 }
          : { duration, ease: 'linear', repeat: Infinity },
      }}
    >
      {Array.from({ length: spokes }).map((_, i) => (
        <span
          key={i}
          className={`absolute left-1/2 top-0 h-full w-px ${spokeColor}`}
          style={{ transform: `translateX(-50%) rotate(${(360 / spokes) * i}deg)` }}
        />
      ))}
      <span className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${hubColor}`} />
    </motion.div>
  );
}

function IntroCycle() {
  const prefersReducedMotion = useReducedMotion();
  const spinDuration = 2.5;

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-[#0A0908] text-[#F7F5F1]"
    >
      <WheelRing
        size="min(78vw, 34rem)"
        spokes={12}
        duration={spinDuration}
        borderWidth="border-2"
        borderColor="border-[#F7F5F1]/20"
        spokeColor="bg-[#F7F5F1]/8"
        hubColor="bg-[#C8522C]"
      />
      <WheelRing
        size="min(58vw, 22rem)"
        spokes={8}
        duration={spinDuration * 0.8}
        reverse
        borderWidth="border"
        borderColor="border-[#F7F5F1]/30"
        spokeColor="bg-[#F7F5F1]/15"
        delay={0.1}
      />
      <WheelRing
        size="min(38vw, 14rem)"
        spokes={6}
        duration={spinDuration * 0.6}
        borderWidth="border"
        borderColor="border-[#F7F5F1]/40"
        spokeColor="bg-[#F7F5F1]/20"
        delay={0.15}
      />
      <motion.div
        className="absolute bottom-12 text-center md:bottom-16"
        initial={{ y: prefersReducedMotion ? 0 : 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.35, ease: easing.outExpo }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#C8522C] md:text-[11px] md:tracking-[0.3em]">
          PedalCraft Atelier
        </p>
        <p className="font-display mt-2 text-2xl font-light italic tracking-[-0.02em] md:mt-3 md:text-3xl">
          cycles in motion
        </p>
      </motion.div>
    </motion.div>
  );
}

export default App;
