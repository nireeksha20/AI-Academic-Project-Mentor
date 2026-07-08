import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI Agents", href: "#agents" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center px-6 py-4 lg:px-8">
        <motion.a
          href="/"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="group flex items-center gap-3 transition-all duration-300"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_45px_rgba(34,211,238,.45)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-slate-400 uppercase">
              AI Mentor
            </p>
            <p className="text-base font-semibold text-white">
              Academic Project Mentor
            </p>
          </div>
        </motion.a>

        <div className="ml-auto hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 * index }}
                className="relative text-sm font-medium text-slate-300 transition-all duration-300 hover:text-cyan-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <RouterLink
              to="/register"
              className="active:scale-95 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Get Started
            </RouterLink>

            <a
              href="#features"
              className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(34,211,238,.45)]"
            >
              Explore Features
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-white/10 bg-slate-950/65 px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <a
                href="#get-started"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,.35)]"
              >
                Explore Features
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
