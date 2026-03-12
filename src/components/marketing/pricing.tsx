"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const includedFeatures = [
  "プロフェッショナルなウェブサイト制作（無料）",
  "スマートフォン完全対応・多言語対応（日・英・中）",
  "お店の実際の写真を使用（ストック写真不使用）",
  "TableCheck・OMAKASE等の予約プラットフォーム連携",
  "更新作業すべて無料（メニュー・写真・営業時間・テキスト）",
  "SSL・サーバー・ドメイン管理すべて込み",
  "解約時はソースコードを全てお渡し",
];

const checkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
      delay: 0.6 + i * 0.08,
    },
  }),
};

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="section-light relative py-28 sm:py-36 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#6366f1] font-semibold text-sm mb-3 font-[var(--font-inter)]">
            料金
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            シンプルな料金、隠れた費用なし
          </h2>
        </motion.div>

        {/* Pricing card with gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] rounded-2xl" />
            <div className="relative m-[1px] bg-white rounded-[calc(1rem-1px)] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-8 py-8 text-center relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <p className="text-indigo-200 text-sm font-medium mb-2 relative z-10">
                  ウェブサイト制作＋管理プラン
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative z-10"
                >
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl sm:text-6xl font-black text-white font-[var(--font-inter)]">
                      &yen;58,800
                    </span>
                    <span className="text-indigo-200 text-sm">（税込）</span>
                  </div>
                </motion.div>
                <p className="text-indigo-200 text-sm mt-3 relative z-10">
                  最初の6ヶ月分 — ウェブサイト制作は無料
                </p>
              </div>

              {/* Body */}
              <div className="px-8 py-8">
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-black text-gray-900">
                      7ヶ月目以降:
                    </span>
                    <span className="text-2xl font-black text-[#6366f1] font-[var(--font-inter)]">
                      &yen;9,800
                    </span>
                    <span className="text-gray-500 text-sm">/月（税込）</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    いつでも解約可能・縛りなし
                  </p>
                </div>

                <p className="font-semibold text-gray-900 mb-4">
                  すべて含まれています:
                </p>
                <ul className="space-y-3 mb-8">
                  {includedFeatures.map((feature, i) => (
                    <motion.li
                      key={feature}
                      custom={i}
                      variants={checkVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#ede9fe] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#6366f1]" />
                      </div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <Link href="#request">
                  <Button className="w-full py-6 text-base font-bold rounded-xl bg-[#6366f1] hover:bg-[#5558e6] text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 cursor-pointer">
                    無料でウェブサイトをリクエスト
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <p className="text-center text-gray-400 text-xs mt-3">
                  または hello@aisolutions.jp までお気軽にどうぞ
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-sm">
            ※ 6ヶ月の初期期間終了後は、月単位でいつでも解約いただけます。
            <br />※ 解約時にはウェブサイトの全ソースコードをお渡しします。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
