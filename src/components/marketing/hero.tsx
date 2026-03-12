"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const headlineWords = ["あなたのお店のウェブサイト、", "先に作りました。"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

export function Hero() {
  return (
    <section className="aurora-bg relative min-h-screen flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Aurora layer 3 */}
      <div className="aurora-layer-3" />

      {/* Grid dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#06b6d4]" />
          <span className="text-sm text-gray-300 font-medium">
            初期費用0円・制作無料
          </span>
        </motion.div>

        {/* Headline with staggered word reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-8"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block ${
                i === 1 ? "gradient-text" : "text-white"
              }`}
            >
              {word}
              {i < headlineWords.length - 1 && <br className="sm:hidden" />}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={1.0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          お店を見つけて、先にウェブサイトをおつくりします。
          <br className="hidden sm:block" />
          気に入っていただけたら、そのままお使いください。
        </motion.p>

        <motion.p
          custom={1.2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-gray-500 text-sm mb-10"
        >
          初期費用0円。まずは6ヶ月、月額9,800円からスタート。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={1.4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="#showcase">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white font-bold glow-primary glow-primary-hover transition-all duration-300 cursor-pointer"
            >
              制作実績を見る
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="#request">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all duration-300 cursor-pointer"
            >
              無料で作ってもらう
            </Button>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
