"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Smartphone,
  Languages,
  Zap,
  ShieldCheck,
  RefreshCw,
  Globe,
  Camera,
  CalendarCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  size: "large" | "small";
}

const features: Feature[] = [
  {
    icon: RefreshCw,
    title: "更新作業すべて無料",
    description:
      "メニュー変更、写真差し替え、営業時間の更新。すべて月額料金に含まれています。「新しい料理の写真を載せたい」というご依頼も追加費用なし。",
    size: "large",
  },
  {
    icon: Camera,
    title: "お店の実際の写真を使用",
    description:
      "ストック写真は使いません。TabelogやInstagramのお店の実際の写真をプロ品質に仕上げて掲載します。",
    size: "small",
  },
  {
    icon: Languages,
    title: "多言語対応（日・英・中）",
    description:
      "日本語・英語に加え、中国語にも対応。インバウンドの集客にも対応できます。",
    size: "small",
  },
  {
    icon: CalendarCheck,
    title: "予約プラットフォーム連携",
    description:
      "TableCheck、OMAKASE、一休など、既存の予約サービスとスムーズに連携。独自の予約フォームは不要です。",
    size: "small",
  },
  {
    icon: Smartphone,
    title: "スマートフォン最適化",
    description:
      "飲食店検索の70%以上はスマホから。どのデバイスでも美しく、高速に表示されます。",
    size: "small",
  },
  {
    icon: Zap,
    title: "高速表示・SEO対策",
    description:
      "ページの読み込みが速く、検索エンジンにも強い設計。見つけてもらえるサイトに。",
    size: "small",
  },
  {
    icon: ShieldCheck,
    title: "SSL・セキュリティ標準装備",
    description: "安全な通信を標準装備。安心してアクセスできます。",
    size: "small",
  },
  {
    icon: Globe,
    title: "独自ドメイン対応",
    description:
      "お店専用のURLで公開。既存のドメインがあればそのままご利用いただけます。",
    size: "small",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const largeFeature = features[0];
  const smallFeatures = features.slice(1);

  return (
    <section className="section-light relative py-28 sm:py-36 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#6366f1] font-semibold text-sm mb-3 font-[var(--font-inter)]">
            含まれるもの
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            すべて含まれています
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Large feature card spanning 2 columns */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 md:row-span-2 gradient-border group"
          >
            <div className="p-8 sm:p-10 h-full flex flex-col justify-center bg-white rounded-[0.875rem]">
              <div className="w-14 h-14 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-6 group-hover:bg-[#6366f1] transition-all duration-300">
                <largeFeature.icon className="w-7 h-7 text-[#6366f1] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {largeFeature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {largeFeature.description}
              </p>
            </div>
          </motion.div>

          {/* Small feature cards */}
          {smallFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="glass-card-light p-6 group hover:bg-gray-50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ede9fe] flex items-center justify-center mb-4 group-hover:bg-[#6366f1] transition-all duration-300">
                <feature.icon className="w-5 h-5 text-[#6366f1] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-sm">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
