"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "デザインが気に入らない場合は？",
    answer:
      "無料で調整いたします。色合い、レイアウト、テキストなど、ご納得いただけるまで修正をお受けします。それでも合わなければ、もちろんお断りいただいて構いません。費用は一切発生しません。",
  },
  {
    question: "「更新作業すべて無料」とは具体的に何ですか？",
    answer:
      "メニューの変更、写真の差し替え、営業時間の更新、テキストの修正など、日常的な変更はすべて月額料金に含まれています。「新しい料理の写真を載せたい」「年末年始の営業時間を更新したい」といったご依頼に、追加費用なしで対応いたします。",
  },
  {
    question: "解約したらどうなりますか？",
    answer:
      "6ヶ月の初期期間終了後は、いつでも解約いただけます。解約時にはウェブサイトの全ソースコードをお渡ししますので、他社への移管やご自身での運用も可能です。データを人質にすることは一切ありません。",
  },
  {
    question: "自分で何かする必要はありますか？",
    answer:
      "基本的に何もしていただく必要はありません。ウェブサイトの作成から公開、運用まですべてこちらで対応いたします。更新が必要な場合は、メールやLINEでお知らせいただくだけで大丈夫です。",
  },
  {
    question: "予約システムはどうなりますか？",
    answer:
      "独自の予約フォームは作りません。TableCheck、OMAKASE、一休など、お店がすでにお使いの予約プラットフォームと連携します。ミシュラン掲載店を含む高級レストランの多くが同じ仕組みを採用しており、予約管理の手間が増えることはありません。",
  },
  {
    question: "外国語対応はできますか？",
    answer:
      "日本語・英語に加え、中国語（簡体字・繁体字）にも対応可能です。インバウンド需要が高まる中、多言語対応は高級レストランサイトでは標準になりつつあります。",
  },
  {
    question: "なぜこんなに安いのですか？",
    answer:
      "飲食店に特化しているため、業種ごとのノウハウが蓄積されています。20以上の高級レストランサイトを分析したデザインパターンがベースにあるからこそ、高品質なサイトを短期間・低コストでお届けできます。",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-light relative py-28 sm:py-36 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#6366f1] font-semibold text-sm mb-3 font-[var(--font-inter)]">
            よくある質問
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            気になることにお答えします
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card-light overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-[#6366f1] transition-colors duration-200"
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 text-sm px-6 pb-5 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
