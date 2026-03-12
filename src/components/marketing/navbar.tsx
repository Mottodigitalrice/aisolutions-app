"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "実績", href: "#showcase" },
  { label: "仕組み", href: "#how-it-works" },
  { label: "料金", href: "#pricing" },
  { label: "よくある質問", href: "#faq" },
];

export function Navbar({ lightBackground = false }: { lightBackground?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || lightBackground
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <span
            className={`font-black text-xl tracking-tight transition-colors duration-500 font-[var(--font-inter)] ${
              scrolled || lightBackground ? "text-[#6366f1]" : "text-[#818cf8]"
            }`}
          >
            AI
          </span>
          <span
            className={`font-bold text-xl tracking-tight transition-colors duration-500 ${
              scrolled || lightBackground ? "text-gray-800" : "text-white"
            }`}
          >
            Solutions
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-300 ${
                scrolled || lightBackground
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="#request">
            <Button
              className={`rounded-full font-semibold px-6 transition-all duration-300 ${
                scrolled || lightBackground
                  ? "bg-[#6366f1] hover:bg-[#5558e6] text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20"
              }`}
            >
              無料で作ってもらう
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={scrolled || lightBackground ? "text-gray-900" : "text-white"}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">メニュー</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[#0a0a0f] border-l border-white/10">
              <SheetTitle className="sr-only">メニュー</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-gray-300 hover:text-white text-lg font-semibold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="#request" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-full font-semibold bg-[#6366f1] hover:bg-[#5558e6] text-white">
                    無料で作ってもらう
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
