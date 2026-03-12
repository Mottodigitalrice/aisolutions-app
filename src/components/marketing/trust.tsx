"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Clock, Code2, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const trustPoints: TrustPoint[] = [
  {
    icon: ShieldCheck,
    title: "リスクゼロ",
    description:
      "気に入らなければ費用は一切かかりません。まずはデモをご覧ください。",
  },
  {
    icon: Clock,
    title: "3日以内にデモ完成",
    description:
      "お待たせしません。リクエストから3営業日以内にデモサイトをお届けします。",
  },
  {
    icon: Code2,
    title: "ソースコード完全引き渡し",
    description:
      "解約時にはすべてのコードをお渡し。データを人質にすることは絶対にしません。",
  },
  {
    icon: HeartHandshake,
    title: "更新は何度でも無料",
    description:
      "メニュー変更も写真差し替えも営業時間更新も、追加費用は一切なし。",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Trust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-light relative py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#6366f1] font-semibold text-sm mb-3 font-[var(--font-inter)]">
            安心のお約束
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            リスクなしで始められます
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {trustPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={cardVariants}
              className="glass-card-light p-6 sm:p-8 group hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ede9fe] flex items-center justify-center flex-shrink-0 group-hover:bg-[#6366f1] transition-all duration-300">
                  <point.icon className="w-5 h-5 text-[#6366f1] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1.5">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
