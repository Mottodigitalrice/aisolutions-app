"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface DemoSite {
  name: string;
  nameJa: string;
  cuisine: string;
  style: string;
  demoUrl: string;
  screenshot: string;
  highlight: string;
}

const demos: DemoSite[] = [
  {
    name: "Fiocchi",
    nameJa: "フィオッキ",
    cuisine: "イタリアン",
    style: "ダークイマーシブ",
    demoUrl: "https://vps.mottodigital.jp/artifacts/fiocchi-demo/",
    screenshot: "/demos/fiocchi.jpg",
    highlight: "実際の料理写真を活かしたダークトーン設計",
  },
  {
    name: "Uehara",
    nameJa: "ビストロ上原",
    cuisine: "フレンチ",
    style: "間の美学",
    demoUrl: "https://vps.mottodigital.jp/artifacts/uehara-demo/",
    screenshot: "/demos/uehara.jpg",
    highlight: "余白を活かした、落ち着きのある和のレイアウト",
  },
  {
    name: "Kotetsu",
    nameJa: "焼肉こてつ",
    cuisine: "焼肉",
    style: "ダークチャコール",
    demoUrl: "https://vps.mottodigital.jp/artifacts/kotetsu-demo/",
    screenshot: "/demos/kotetsu.jpg",
    highlight: "炭火の世界観を表現するチャコールカラー",
  },
];

export function DemoShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const activeDemo = demos[activeIndex];

  const goNext = () => setActiveIndex((prev) => (prev + 1) % demos.length);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + demos.length) % demos.length);

  const headerAnimation = inView
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };
  const contentAnimation = inView
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30 };

  return (
    <section
      id="showcase"
      className="section-dark relative py-32 sm:py-40 px-4 sm:px-6 overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />

      {/* Light-to-dark transition at top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#fafafa] to-transparent z-[1]" />

      {/* Dark-to-light transition at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fafafa] to-transparent z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerAnimation}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-[#06b6d4] font-semibold text-sm mb-3 font-[var(--font-inter)]">
            制作実績
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5">
            ミシュラン掲載店の
            <br className="sm:hidden" />
            デザイン水準で
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            20以上の高級レストランサイトを分析し、その設計パターンを取り入れた
            デザイン。お店の実際の写真を使い、一つひとつ個別に制作しています。
          </p>
        </motion.div>

        {/* Authority badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14"
        >
          {[
            "お店の実際の写真を使用",
            "テンプレート不使用",
            "スマートフォン完全対応",
          ].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full text-xs sm:text-sm text-gray-400 border border-white/10 bg-white/[0.03]"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentAnimation}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab navigation */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-10">
            {demos.map((demo, i) => (
              <button
                key={demo.name}
                onClick={() => setActiveIndex(i)}
                className={
                  i === activeIndex
                    ? "px-4 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm font-semibold transition-all duration-300 bg-white/10 text-white border border-white/20"
                    : "px-4 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm font-semibold transition-all duration-300 text-gray-500 hover:text-gray-300 border border-transparent"
                }
              >
                {demo.nameJa}
                <span className="text-xs text-gray-500 ml-1.5 hidden sm:inline">
                  {demo.cuisine}
                </span>
              </button>
            ))}
          </div>

          {/* Screenshot display — larger with more breathing room */}
          <div className="relative max-w-5xl mx-auto">
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-8 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-8 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="gradient-border overflow-hidden"
              >
                <div className="p-1">
                  <div className="rounded-[0.875rem] overflow-hidden">
                    {/* Browser chrome */}
                    <div className="bg-[#1a1a2e] px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-gray-500 ml-2 font-mono truncate">
                        {activeDemo.name.toLowerCase()}.aisolutions.jp
                      </div>
                    </div>

                    {/* Screenshot — taller aspect ratio for more impact */}
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={activeDemo.screenshot}
                        alt={`${activeDemo.nameJa} — ${activeDemo.cuisine}のウェブサイト`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 960px"
                        priority={activeIndex === 0}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Demo info + highlight + CTAs */}
          <div className="max-w-5xl mx-auto mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <p className="text-white font-bold text-lg mb-1">
                  {activeDemo.nameJa}
                  <span className="text-gray-500 font-normal ml-2 text-sm">
                    {activeDemo.cuisine}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  {activeDemo.highlight}
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={activeDemo.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="rounded-full border-white/20 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
                  >
                    デモを見る
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <Link href="#request">
                  <Button className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white">
                    自分のお店も作ってほしい
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {demos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={
                  i === activeIndex
                    ? "w-6 h-2 rounded-full transition-all duration-300 bg-[#6366f1]"
                    : "w-2 h-2 rounded-full transition-all duration-300 bg-white/20 hover:bg-white/40"
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
