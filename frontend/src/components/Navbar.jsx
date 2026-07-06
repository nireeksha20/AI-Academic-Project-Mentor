import { Link } from "react-router-dom";
import { GraduationCap, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./Button";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-5 left-1/2 z-50 w-[92%] max-w-7xl -translate-x-1/2"
    >
      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-8 py-4 backdrop-blur-xl shadow-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-2">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">AI Academic</h1>

            <p className="text-sm text-slate-300">Project Mentor</p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-8 text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#workflow" className="transition hover:text-white">
            How It Works
          </a>

          <a href="#about" className="transition hover:text-white">
            About
          </a>

          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>

        {/* Buttons */}

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>

          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile */}

        <button className="text-white md:hidden">
          <Menu />
        </button>
      </div>
    </motion.nav>
  );
}
