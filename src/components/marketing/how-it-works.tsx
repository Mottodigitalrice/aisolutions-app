"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PenTool, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Search,
    title: "お店を見つけて、改善点を確認します",
    description:
      "地域のお店を調べ、ウェブサイトが古い・ない・改善できそうなお店をお探しします。ご連絡は不要です。",
  },
  {
    number: 2,
    icon: PenTool,
    title: "新しいウェブサイトを無料で作成します",
    description:
      "お店の実際の写真を使い、高級レストランサイトの設計パターンを取り入れたデザインで制作。スマホ対応・高速表示・予約プラットフォーム連携まで対応します。制作費は無料です。",
  },
  {
    number: 3,
    icon: Rocket,
    title: "気に入ったら、月額管理でそのままスタート",
    description:
      "気に入っていただけたら、月額9,800円の管理プランにお申し込み。メニュー変更・写真差し替え・営業時間更新など、すべての更新作業が含まれています。",
  },
];

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      delay: i * 0.2,
    },
  }),
};

const numberVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      delay: i * 0.2 + 0.1,
    },
  }),
};

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="section-light relative py-28 sm:py-36 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#6366f1] font-semibold text-sm mb-3 font-[var(--font-inter)]">
            仕組み
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            オーナーさんにしていただくことは、
            <br className="sm:hidden" />
            ほぼありません
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] hidden sm:block" />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex gap-6 items-start relative"
              >
                {/* Step number circle */}
                <motion.div
                  custom={i}
                  variants={numberVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/25"
                >
                  <span className="text-white font-black text-lg font-[var(--font-inter)]">
                    {step.number}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="flex-1 glass-card-light p-6 sm:p-8 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ede9fe] flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-[#6366f1]" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pl-11">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
