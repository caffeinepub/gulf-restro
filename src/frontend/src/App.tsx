import {
  Circle,
  Clock,
  Coffee,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  Music,
  Phone,
  Twitter,
  Users,
  Utensils,
  Waves,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─── Menu data ─── */
type MenuItem = { name: string; price: string; veg: boolean };
type MenuCategory = { label: string; emoji: string; items: MenuItem[] };

const menuData: MenuCategory[] = [
  {
    label: "Breakfast & Eggs",
    emoji: "🍳",
    items: [
      { name: "Aloo Paratha", price: "₹100", veg: true },
      { name: "Aloo Pyaz Paratha", price: "₹120", veg: true },
      { name: "Methi Paratha", price: "₹140", veg: true },
      { name: "Gobi Paratha", price: "₹140", veg: true },
      { name: "Paneer Paratha", price: "₹160", veg: true },
      { name: "Paneer Pyaz Paratha", price: "₹180", veg: true },
      { name: "Pyaz Paratha", price: "₹100", veg: true },
      { name: "Chicken Paratha", price: "₹180", veg: false },
      { name: "Masala Omelette", price: "₹80", veg: false },
      { name: "Scrambled Masala Egg", price: "₹100", veg: false },
      { name: "Sunny Side Up", price: "₹60", veg: false },
      { name: "Cheese Omelette", price: "₹120", veg: false },
      { name: "Chicken Cheese Omelette", price: "₹150", veg: false },
      { name: "Egg Bhurji with Pav", price: "₹150", veg: false },
      { name: "Chicken Keema with Pav", price: "₹200", veg: false },
      { name: "Boiled Egg (1 pc)", price: "₹15", veg: false },
    ],
  },
  {
    label: "Quick Bites & Maggi",
    emoji: "🍟",
    items: [
      { name: "Plain Maggi", price: "₹80", veg: true },
      { name: "Veg Masala Maggi", price: "₹100", veg: true },
      { name: "Cheese Maggi", price: "₹120", veg: true },
      { name: "Veg Cheese Maggi", price: "₹120", veg: true },
      { name: "Egg Maggi", price: "₹120", veg: false },
      { name: "Chicken Maggi", price: "₹150", veg: false },
      { name: "French Fries", price: "₹100", veg: true },
      { name: "Peri Peri Fries", price: "₹130", veg: true },
      { name: "Cheese Fries", price: "₹140", veg: true },
      { name: "Loaded Cheese Fries", price: "₹160", veg: true },
      { name: "Cajun Spice Potato Wedges", price: "₹150", veg: true },
      { name: "Garlic Bread (3 pcs)", price: "₹80", veg: true },
      { name: "Cheese Garlic Bread (3 pcs)", price: "₹120", veg: true },
      { name: "Chicken Cheese Nuggets", price: "₹200", veg: false },
      { name: "Crispy Chicken Tenders", price: "₹300", veg: false },
    ],
  },
  {
    label: "Pizza & Pasta",
    emoji: "🍕",
    items: [
      { name: "Corn Pizza", price: "₹200", veg: true },
      { name: "Margherita Pizza", price: "₹200", veg: true },
      { name: "Paneer Tikka Pizza", price: "₹230", veg: true },
      { name: "Farm House Pizza", price: "₹240", veg: true },
      { name: "All American Pizza", price: "₹250", veg: true },
      { name: "Mexican Delight Pizza", price: "₹260", veg: true },
      { name: "Spicy Chicken Pizza", price: "₹280", veg: false },
      { name: "BBQ Chicken Pizza", price: "₹280", veg: false },
      { name: "Veg Penne Alfredo", price: "₹220", veg: true },
      { name: "Fusilli Arrabbiata Veg", price: "₹240", veg: true },
      { name: "Al Pesto Penne", price: "₹250", veg: true },
      { name: "Pink Sauce Pasta", price: "₹250", veg: true },
      { name: "Fusilli Arrabbiata Chicken", price: "₹260", veg: false },
      { name: "Al Pesto Chicken Pasta", price: "₹270", veg: false },
    ],
  },
  {
    label: "Burgers & Rolls",
    emoji: "🍔",
    items: [
      { name: "Veggie Burger", price: "₹180", veg: true },
      { name: "Cottage Cheese Burger", price: "₹200", veg: true },
      { name: "Chicken Burger", price: "₹200", veg: false },
      { name: "Crispy Chicken Burger", price: "₹230", veg: false },
      { name: "Veg Grill Sandwich", price: "₹160", veg: true },
      { name: "Paneer Tikka Sandwich", price: "₹180", veg: true },
      { name: "Chicken Grill Sandwich", price: "₹200", veg: false },
      { name: "Chicken Tikka Sandwich", price: "₹200", veg: false },
      { name: "Paneer Tikka Roll", price: "₹160", veg: true },
      { name: "Chicken Tikka Roll", price: "₹170", veg: false },
      { name: "Chicken Shawarma Roll", price: "₹150", veg: false },
    ],
  },
  {
    label: "Starters",
    emoji: "🔥",
    items: [
      { name: "Paneer Tikka", price: "₹240", veg: true },
      { name: "Paneer Malai Tikka", price: "₹260", veg: true },
      { name: "Paneer Chilly", price: "₹180 / ₹240", veg: true },
      { name: "Veg Manchurian", price: "₹180 / ₹240", veg: true },
      { name: "Veg Momos (Steam)", price: "₹120", veg: true },
      { name: "Tandoori Chicken", price: "₹300 / ₹550", veg: false },
      { name: "Chicken Tikka", price: "₹260", veg: false },
      { name: "Chicken Malai Tikka", price: "₹280", veg: false },
      { name: "Chilly Chicken", price: "₹260", veg: false },
      { name: "Chicken Lollipop", price: "₹250", veg: false },
      { name: "Chicken Momos (Steam)", price: "₹150", veg: false },
    ],
  },
  {
    label: "Continental",
    emoji: "🥗",
    items: [
      { name: "Loaded Nachos", price: "₹200", veg: true },
      { name: "Roasted Veg Dunes Bruschetta", price: "₹180", veg: true },
      { name: "Jalapeno Cheese Popcorn", price: "₹210", veg: true },
      { name: "Paneer Tikka Hot Pot", price: "₹190", veg: true },
      { name: "Bread Butter Toast", price: "₹60", veg: true },
      { name: "Loaded Nachos Chicken", price: "₹250", veg: false },
      { name: "Roasted Chicken Bruschetta", price: "₹210", veg: false },
      { name: "Chicken Tikka Hot Pot", price: "₹210", veg: false },
      { name: "Chicken Popcorn", price: "₹200", veg: false },
      { name: "Egg Bombay Sandwich", price: "₹180", veg: false },
      { name: "Egg Sandwich", price: "₹100 / ₹140", veg: false },
      { name: "Mexican Grill Chicken Sizzler", price: "₹450", veg: false },
    ],
  },
  {
    label: "Salads & Soups",
    emoji: "🥣",
    items: [
      { name: "Classical Caesar Salad", price: "₹220", veg: true },
      { name: "Greek Salad", price: "₹200", veg: true },
      { name: "Veg Manchow Soup", price: "₹100 / ₹120", veg: true },
      { name: "Hot & Sour Soup", price: "₹110 / ₹130", veg: true },
      { name: "Thukpa", price: "₹120 / ₹150", veg: true },
      { name: "Sweet Corn Soup", price: "₹100 / ₹120", veg: true },
      { name: "Chicken Caesar Salad", price: "₹250", veg: false },
    ],
  },
  {
    label: "North Indian Main",
    emoji: "🍛",
    items: [
      { name: "Paneer Butter Masala", price: "₹250", veg: true },
      { name: "Kadhai Paneer", price: "₹260", veg: true },
      { name: "Paneer Tikka Masala", price: "₹280", veg: true },
      { name: "Veg Diwani Handi", price: "₹240", veg: true },
      { name: "Dal Fry", price: "₹140", veg: true },
      { name: "Dal Tadka", price: "₹160", veg: true },
      { name: "Dal Makhani", price: "₹240", veg: true },
      { name: "Butter Chicken", price: "₹250", veg: false },
      { name: "Kadhai Chicken", price: "₹280", veg: false },
      { name: "Chicken Tikka Masala", price: "₹300", veg: false },
      { name: "Home Style Chicken", price: "₹270", veg: false },
    ],
  },
  {
    label: "Chinese Wok",
    emoji: "🥡",
    items: [
      { name: "Veg Fried Rice", price: "₹120 / ₹200", veg: true },
      { name: "Veg Schezwan Rice", price: "₹140 / ₹220", veg: true },
      { name: "Veg Noodles", price: "₹120 / ₹200", veg: true },
      { name: "Veg Schezwan Noodles", price: "₹140 / ₹220", veg: true },
      { name: "Paneer Noodles", price: "₹180 / ₹250", veg: true },
      { name: "Chicken Fried Rice", price: "₹180 / ₹240", veg: false },
      { name: "Chicken Schezwan Rice", price: "₹200 / ₹260", veg: false },
    ],
  },
  {
    label: "Breads & Rice",
    emoji: "🫓",
    items: [
      { name: "Chapati (Tawa)", price: "₹20", veg: true },
      { name: "Tandoori Roti", price: "₹45", veg: true },
      { name: "Butter Roti", price: "₹60", veg: true },
      { name: "Plain Naan", price: "₹65", veg: true },
      { name: "Butter Naan", price: "₹80", veg: true },
      { name: "Garlic Naan", price: "₹100", veg: true },
      { name: "Laccha Paratha", price: "₹80", veg: true },
      { name: "Plain Rice", price: "₹100", veg: true },
      { name: "Jeera Rice", price: "₹120", veg: true },
      { name: "Veg Biryani", price: "₹220", veg: true },
      { name: "Chicken Biryani", price: "₹280", veg: false },
    ],
  },
  {
    label: "Desserts & Beverages",
    emoji: "☕",
    items: [
      { name: "Hot Coffee", price: "₹50", veg: true },
      { name: "Cold Coffee", price: "₹120", veg: true },
      { name: "Cold Coffee with Ice Cream", price: "₹150", veg: true },
      { name: "Oreo Shake", price: "₹140", veg: true },
      { name: "Lava Cake", price: "₹200", veg: true },
      { name: "Sizzling Brownie", price: "₹200", veg: true },
      { name: "Fresh Lime Soda", price: "₹80", veg: true },
      { name: "Mineral Water", price: "₹20", veg: true },
    ],
  },
];

/* ─── Static data ─── */
const vibeCards = [
  {
    emoji: "🌊",
    title: "Scenic Dining",
    desc: "Open-air tables with a view that hits different at sunset.",
    tag: "Outdoor",
  },
  {
    emoji: "🎱",
    title: "Pool Sessions",
    desc: "Competitive. Chill. Always a queue. Grab your cue.",
    tag: "Games",
  },
  {
    emoji: "☕",
    title: "Tapri Corner",
    desc: "Chai, cigarettes, and conversations that last all night.",
    tag: "Tapri",
  },
  {
    emoji: "🎓",
    title: "Student Vibes",
    desc: "The spot your whole friend group ends up at.",
    tag: "Social",
  },
];

const bgIcons = [
  { icon: Circle, x: "5%", y: "10%", size: 80, opacity: 0.06 },
  { icon: Coffee, x: "15%", y: "60%", size: 40, opacity: 0.1 },
  { icon: Music, x: "78%", y: "15%", size: 52, opacity: 0.08 },
  { icon: Users, x: "88%", y: "65%", size: 44, opacity: 0.1 },
  { icon: Utensils, x: "42%", y: "72%", size: 36, opacity: 0.08 },
  { icon: Waves, x: "60%", y: "8%", size: 48, opacity: 0.08 },
  { icon: Circle, x: "30%", y: "30%", size: 100, opacity: 0.04 },
  { icon: Coffee, x: "92%", y: "35%", size: 34, opacity: 0.1 },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Vibe", href: "#vibe" },
  { label: "Find Us", href: "#find-us" },
];

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "shadow-glass-lg" : "shadow-glass"
          }`}
        >
          <a
            href="#home"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-full bg-green-cta flex items-center justify-center shadow-green-glow">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-forest tracking-tight">
              Gulf <span className="text-green-cta">Resstro</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-body hover:text-forest transition-colors relative group"
                data-ocid="nav.link"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-cta rounded-full transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#find-us"
              className="btn-charcoal px-5 py-2 rounded-full text-sm font-semibold"
              data-ocid="nav.primary_button"
            >
              Book Now
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-full hover:bg-white/40 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-forest" />
            ) : (
              <Menu className="w-5 h-5 text-forest" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl mt-2 p-4 flex flex-col gap-3 md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-body hover:text-forest py-2 px-3 rounded-xl hover:bg-white/40 transition-all"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#find-us"
                className="btn-charcoal px-5 py-2 rounded-full text-sm font-semibold text-center"
                data-ocid="nav.primary_button"
              >
                Book Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient"
    >
      <div
        className="blob absolute w-[500px] h-[500px] opacity-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.80 0.12 155), oklch(0.75 0.10 193))",
          top: "-10%",
          right: "-8%",
        }}
      />
      <div
        className="blob absolute w-[350px] h-[350px] opacity-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.85 0.10 186), oklch(0.82 0.08 155))",
          bottom: "5%",
          left: "-5%",
          animationDelay: "2s",
          animationDuration: "10s",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-semibold text-green-cta uppercase tracking-widest mb-4 shadow-glass">
              🌊 Open Now · Till 12am
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black uppercase leading-tight text-forest mb-5"
          >
            The Place
            <br />
            <span className="text-green-cta">Everyone's</span>
            <br />
            Going Tonight.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-muted-green mb-8 max-w-md leading-relaxed"
          >
            Coastal vibes. Great food. Pool tables. Tapri corner.
            <br />
            <strong className="text-body">Gulf Resstro</strong> — the hangout
            you'll keep coming back to.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#vibe"
              className="btn-green px-7 py-3 rounded-full font-semibold text-sm shadow-green-glow"
              data-ocid="hero.primary_button"
            >
              Explore the Vibe
            </a>
            <a
              href="#find-us"
              className="btn-outline px-7 py-3 rounded-full font-semibold text-sm"
              data-ocid="hero.secondary_button"
            >
              Book a Table
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-10"
          >
            {[
              { val: "10", label: "Tables" },
              { val: "12am", label: "We Close" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-forest">
                  {stat.val}
                </div>
                <div className="text-xs text-muted-green font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex flex-col gap-4 items-end"
        >
          <div className="glass-card rounded-3xl p-8 shadow-glass-lg w-full max-w-sm animate-float">
            <div className="text-6xl mb-4 text-center">🍽️</div>
            <div
              className="w-full h-40 rounded-2xl mb-4 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.88 0.07 155), oklch(0.82 0.08 186))",
              }}
            >
              <span className="text-5xl">🌊</span>
            </div>
            <div className="text-center">
              <p className="font-bold text-forest text-sm">Coastal dining</p>
              <p className="text-xs text-muted-green mt-1">
                Open air · Sea breeze · Great food
              </p>
            </div>
          </div>
          <div className="glass-card rounded-2xl px-5 py-3 shadow-glass flex items-center gap-3">
            <span className="text-2xl">🎱</span>
            <div>
              <p className="text-xs font-bold text-forest">
                Pool Tables Available
              </p>
              <p className="text-xs text-muted-green">Join the queue tonight</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-muted-green">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-green/40 flex items-start justify-center pt-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-1 h-2 rounded-full bg-green-cta"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Our Vibe ─── */
function OurVibe() {
  return (
    <section id="vibe" className="py-20 bg-section-mint">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-green-cta mb-2 block">
            The Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest">
            Our Vibe
          </h2>
          <p className="text-muted-green mt-3 max-w-md mx-auto text-sm">
            It's not just a restaurant. It's where your evening lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vibeCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="glass-card rounded-2xl p-6 card-hover shadow-glass h-full flex flex-col"
                data-ocid={`vibe.item.${i + 1}`}
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="font-bold text-sm uppercase tracking-wide text-forest mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-green leading-relaxed flex-1">
                  {card.desc}
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-green-cta/10 text-green-cta text-xs font-semibold px-3 py-1 rounded-full">
                    {card.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Full Menu ─── */
function FullMenu() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const category = menuData[activeTab];

  const scrollTabIntoView = (idx: number) => {
    setActiveTab(idx);
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.children[idx] as HTMLElement;
    if (btn)
      btn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  };

  return (
    <section
      id="menu"
      className="py-20"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.94 0.04 142) 0%, oklch(0.96 0.025 186) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-green-cta mb-2 block">
            What We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest">
            Our Menu
          </h2>
          <p className="text-muted-green mt-3 max-w-md mx-auto text-sm">
            From tapri snacks to full meals — everything made fresh.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="relative mb-8">
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {menuData.map((cat, i) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => scrollTabIntoView(i)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === i
                    ? "bg-green-cta text-white shadow-green-glow"
                    : "glass text-forest hover:bg-white/60"
                }`}
                data-ocid={`menu.tab.${i + 1}`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="glass-card rounded-xl px-5 py-4 flex items-center justify-between shadow-glass"
                  data-ocid={`menu.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Veg / non-veg indicator */}
                    <div
                      className={`w-4 h-4 rounded-sm border-2 flex-shrink-0 flex items-center justify-center ${
                        item.veg ? "border-green-600" : "border-red-600"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.veg ? "bg-green-600" : "bg-red-600"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium text-forest truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-green-cta ml-3 flex-shrink-0">
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Full menu link */}
        <div className="text-center mt-10">
          <a
            href="https://gulf-resstro-menu.tiiny.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-block px-8 py-3 rounded-full text-sm font-semibold"
            data-ocid="menu.primary_button"
          >
            View Full Menu PDF →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Tonight's Vibe ─── */
function TonightsVibe() {
  return (
    <section className="py-24 relative overflow-hidden bg-vibe-gradient">
      {bgIcons.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={`icon-${item.x}`}
            className="absolute pointer-events-none"
            style={{ left: item.x, top: item.y, opacity: item.opacity }}
          >
            <Icon size={item.size} color="white" />
          </div>
        );
      })}

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4 block">
            Tonight
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            "Good food.
            <br />
            <span className="opacity-80">Great company.</span>
            <br />
            Zero excuses."
          </h2>
          <p className="text-white/60 text-sm mb-8">
            The vibe is always right at Gulf Resstro.
          </p>
          <a
            href="#find-us"
            className="inline-block bg-white text-forest font-bold px-8 py-3 rounded-full text-sm shadow-glass-lg hover:shadow-green-glow transition-all hover:-translate-y-1"
            data-ocid="vibe.primary_button"
          >
            Find Us Tonight →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Instagram Strip ─── */
function InstagramStrip() {
  const posts = [
    { emoji: "🌊", bg: "from-cyan-100 to-teal-100" },
    { emoji: "🎱", bg: "from-emerald-100 to-green-100" },
    { emoji: "🍟", bg: "from-yellow-100 to-lime-100" },
    { emoji: "☕", bg: "from-amber-100 to-orange-100" },
    { emoji: "🌃", bg: "from-indigo-100 to-blue-100" },
    { emoji: "🎶", bg: "from-pink-100 to-rose-100" },
  ];

  return (
    <section className="py-16 bg-section-mint">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Instagram className="w-5 h-5 text-forest" />
            <span className="font-bold text-forest">@GULFRESSTRO</span>
            <span className="text-muted-green text-sm">on Instagram</span>
          </div>
          <p className="text-xs text-muted-green">
            Tag us and get featured! 🌊
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.emoji}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`aspect-square rounded-2xl bg-gradient-to-br ${post.bg} flex items-center justify-center card-hover shadow-glass cursor-pointer`}
              data-ocid={`instagram.item.${i + 1}`}
            >
              <span className="text-3xl">{post.emoji}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Find Us ─── */
function FindUs() {
  return (
    <section
      id="find-us"
      className="py-20"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.96 0.025 186) 0%, oklch(0.94 0.03 193) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-green-cta mb-2 block">
            Get Here
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest">
            Find Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 shadow-glass"
          >
            <h3 className="font-bold text-xl text-forest mb-6">Gulf Resstro</h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-green-cta/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-green-cta" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-forest">Address</p>
                  <p className="text-sm text-muted-green mt-0.5">
                    Near Flame University, Lavale Gaon
                    <br />
                    Kudale Wasti, Mulshi - 412115, Pune
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-green-cta/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-green-cta" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-forest">Hours</p>
                  <p className="text-sm text-muted-green mt-0.5">
                    Mon – Sun: 9:00 AM – 12:00 AM
                  </p>
                  <p className="text-xs text-green-cta font-medium mt-1">
                    ✓ Open now
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-green-cta/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-green-cta" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-forest">
                    Reservations
                  </p>
                  <a
                    href="tel:+917977955624"
                    className="text-sm text-green-cta hover:underline mt-0.5 block"
                    data-ocid="findus.link"
                  >
                    +91 79779 55624
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <a
                href="tel:+917977955624"
                className="btn-green flex-1 py-3 rounded-xl text-sm font-semibold text-center shadow-green-glow"
                data-ocid="findus.primary_button"
              >
                Call to Book
              </a>
              <a
                href="https://maps.google.com/?q=Near+Flame+University+Lavale+Gaon+Kudale+Wasti+Mulshi+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 py-3 rounded-xl text-sm font-semibold text-center"
                data-ocid="findus.secondary_button"
              >
                Get Directions
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl overflow-hidden shadow-glass min-h-[320px] flex flex-col"
          >
            <div
              className="flex-1 flex flex-col items-center justify-center relative"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.88 0.06 155) 0%, oklch(0.84 0.08 186) 100%)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              >
                <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-glass-lg mb-4">
                  <MapPin className="w-8 h-8 text-green-cta" />
                </div>
              </motion.div>
              <p className="text-forest font-bold text-sm">Gulf Resstro</p>
              <p className="text-muted-green text-xs mt-1">
                Near Flame University, Lavale
              </p>
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(0.25 0.07 165) 1px, transparent 1px), linear-gradient(90deg, oklch(0.25 0.07 165) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            <div className="p-4 glass">
              <p className="text-xs text-muted-green text-center">
                📍 Adjacent Flame University Entrance · Lavale, Pune
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-footer-gradient">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-footer-text" />
              </div>
              <span className="font-bold text-footer-text text-lg">
                Gulf <span className="opacity-70">Resstro</span>
              </span>
            </div>
            <p className="text-footer-text/60 text-sm leading-relaxed">
              Where the vibe is always right.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com/GULFRESSTRO"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-dark flex items-center justify-center hover:bg-white/20 transition-colors"
                data-ocid="footer.link"
              >
                <Instagram className="w-4 h-4 text-footer-text" />
              </a>
              <a
                href="https://x.com/gulfrestro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-dark flex items-center justify-center hover:bg-white/20 transition-colors"
                data-ocid="footer.link"
              >
                <Twitter className="w-4 h-4 text-footer-text" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-footer-text font-semibold text-sm uppercase tracking-wide mb-4">
              Quick Links
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Menu", href: "#menu" },
                { label: "Vibe", href: "#vibe" },
                { label: "Hours", href: "#find-us" },
                { label: "Location", href: "#find-us" },
                { label: "Contact", href: "tel:+917977955624" },
                { label: "Legal", href: "#home" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-footer-text/60 text-sm hover:text-footer-text transition-colors"
                  data-ocid="footer.link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-footer-text font-semibold text-sm uppercase tracking-wide mb-4">
              Hours
            </p>
            <div className="space-y-2 text-sm text-footer-text/60">
              <p>Monday – Sunday</p>
              <p className="text-footer-text font-medium">9:00 AM – 12:00 AM</p>
              <p className="text-xs mt-3">
                📍 Near Flame University, Lavale, Pune
              </p>
              <p className="text-xs">📞 +91 79779 55624</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-footer-text/40 text-xs">
            © {year} Gulf Resstro. All rights reserved.
          </p>
          <a
            href={caffeineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-footer-text/40 text-xs hover:text-footer-text/60 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="font-poppins">
      <Navbar />
      <main>
        <Hero />
        <OurVibe />
        <FullMenu />
        <TonightsVibe />
        <InstagramStrip />
        <FindUs />
      </main>
      <Footer />
    </div>
  );
}
