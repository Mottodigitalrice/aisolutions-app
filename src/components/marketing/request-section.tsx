"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { OnboardingWizard } from "./onboarding-wizard";

export function RequestSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="request"
      className="section-dark relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Light-to-dark transition at top */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#fafafa] to-transparent z-[1]" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative z-10 max-w-2xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[#06b6d4] font-semibold text-sm mb-3 font-[var(--font-inter)]">
            無料ウェブサイト制作
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            あなたのお店のウェブサイトをリクエスト
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            簡単な質問に答えるだけ。
            <span className="text-white font-semibold">3営業日以内</span>
            にウェブサイトのデモをお送りします。費用は一切かかりません。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 sm:p-8"
        >
          <OnboardingWizard />
        </motion.div>
      </div>
    </section>
  );
}
