"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    question: "なぜこんなに安いのですか？",
    answer:
      "最新のツールと効率的な制作プロセスにより、従来の制作会社よりも大幅にコストを抑えています。質を落としているわけではなく、無駄な工程を省いているだけです。その分の価値をお客様にお返ししています。",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide mb-3">
            よくある質問
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            気になることにお答えします
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-gray-900"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600 text-sm px-6 pb-5 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
