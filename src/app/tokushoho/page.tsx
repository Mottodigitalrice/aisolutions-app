import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "AI Solutions（運営: Multidigital合同会社）の特定商取引法に基づく表記です。",
  openGraph: {
    title: "特定商取引法に基づく表記 — AI Solutions",
    description:
      "AI Solutions（運営: Multidigital合同会社）の特定商取引法に基づく表記です。",
    url: "https://aisolutions.jp/tokushoho",
  },
};

const disclosureItems = [
  {
    label: "販売業者",
    value: "Multidigital合同会社",
  },
  {
    label: "代表者",
    value: "Lewis Rice（ルイス・ライス）",
  },
  {
    label: "所在地",
    value: "お問い合わせいただいた方にお知らせいたします",
  },
  {
    label: "電話番号",
    value: "お問い合わせいただいた方にお知らせいたします",
  },
  {
    label: "メールアドレス",
    value: "hello@aisolutions.jp",
    isEmail: true,
  },
  {
    label: "サービス名",
    value: "AI Solutions ウェブサイト制作サービス",
  },
  {
    label: "販売価格",
    value:
      "初回6ヶ月分 58,800円（税込）、7ヶ月目以降 月額9,800円（税込）",
  },
  {
    label: "支払方法",
    value: "クレジットカード、銀行振込",
  },
  {
    label: "サービス提供時期",
    value: "お申し込みから3営業日以内にデモサイト納品",
  },
  {
    label: "返品・キャンセル",
    value:
      "6ヶ月の最低利用期間あり。期間満了後はいつでも解約可能。解約時は全ソースコードをお引き渡しいたします。",
  },
  {
    label: "動作環境",
    value:
      "モダンブラウザ（Chrome, Safari, Firefox, Edge の最新版）",
  },
];

export default function TokushohoPage() {
  return (
    <div className="min-h-screen">
      <Navbar lightBackground />

      <main className="section-light pt-28 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-12">
            特定商取引法に基づく表記
          </h1>

          <dl className="divide-y divide-gray-200">
            {disclosureItems.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-5"
              >
                <dt className="text-sm font-bold text-gray-900">
                  {item.label}
                </dt>
                <dd className="text-sm text-gray-700 leading-relaxed">
                  {item.isEmail ? (
                    <a
                      href={`mailto:${item.value}`}
                      className="text-[#6366f1] hover:underline font-[var(--font-inter)]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </main>

      <Footer />
    </div>
  );
}
