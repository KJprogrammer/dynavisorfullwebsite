"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Technology", href: "#technology" },
  { label: "Partnership", href: "#partnership" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-[#000008]/70 border-b border-white/[0.05]"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0.5 group">
            <span className="font-display text-xl font-light tracking-wider text-[#e2ddd4] group-hover:text-[#c4a55a] transition-colors duration-300">
              Dyna
            </span>
            <span className="font-display text-xl font-light tracking-wider text-[#c4a55a]">
              visor
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-sans text-[11px] tracking-[0.18em] uppercase text-[#e2ddd4]/40 hover:text-[#e2ddd4]/80 transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex btn-gold text-[11px] py-2 px-5"
            >
              Get Access
            </a>
            <button
              className="md:hidden text-[#e2ddd4]/50 hover:text-[#e2ddd4] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-2xl bg-[#000008]/95 border-b border-white/[0.05] px-6 py-8 flex flex-col gap-6"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-sans text-xs tracking-[0.2em] uppercase text-[#e2ddd4]/50 hover:text-[#e2ddd4] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-gold text-center text-xs mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Get Access
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
