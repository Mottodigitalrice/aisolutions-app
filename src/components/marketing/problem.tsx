"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertCircle, Banknote, Clock, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ProblemItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const problems: ProblemItem[] = [
  {
    icon: AlertCircle,
    title: "ホームページが古いまま",
    description:
      "何年も前に作ったきり、スマホで見ると崩れている。せっかく検索で見つけてもらっても、お店の良さが伝わらない。",
  },
  {
    icon: Banknote,
    title: "制作会社は高すぎる",
    description:
      "見積もりを取ると30万円以上。小規模なお店にとっては大きな出費で、なかなか踏み出せない。",
  },
  {
    icon: Clock,
    title: "自分で作る時間がない",
    description:
      "WixやWordPressを試しても、操作を覚える時間がない。本業が忙しく、途中で止まってしまう。",
  },
  {
    icon: Users,
    title: "スマホ検索で選ばれていない",
    description:
      "飲食店検索の70%以上はスマートフォンから。スマホ対応していないサイトは、それだけで選択肢から外れてしまう。",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.2 },
  },
};

export function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-light relative py-28 sm:py-36 px-4 sm:px-6 dot-pattern-light">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#6366f1] font-semibold text-sm mb-3 font-[var(--font-inter)]">
            よくあるお悩み
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            こんなお悩み、
            <br className="sm:hidden" />
            ありませんか？
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={cardVariants}
              className="glass-card-light p-6 sm:p-8 group hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
            >
              <motion.div
                variants={iconVariants}
                className="w-12 h-12 rounded-xl bg-[#ede9fe] flex items-center justify-center mb-4 group-hover:bg-[#6366f1] transition-colors duration-300"
              >
                <problem.icon className="w-6 h-6 text-[#6366f1] group-hover:text-white transition-colors duration-300" />
              </motion.div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
