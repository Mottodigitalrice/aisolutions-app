"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "サービス", href: "#how-it-works" },
  { label: "料金", href: "#pricing" },
  { label: "よくある質問", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-primary font-black text-xl tracking-tight">
            AI
          </span>
          <span className="text-gray-800 font-bold text-xl tracking-tight">
            Solutions
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="#request">
            <Button className="rounded-lg font-semibold">
              無料でリクエスト
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">メニュー</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">メニュー</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-gray-700 hover:text-gray-900 text-lg font-semibold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="#request" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-lg font-semibold">
                    無料でリクエスト
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
