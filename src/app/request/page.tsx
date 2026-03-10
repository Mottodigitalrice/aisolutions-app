import type { Metadata } from "next";
import Link from "next/link";
import { IntakeForm } from "@/components/marketing/intake-form";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "無料ウェブサイトをリクエスト",
  description:
    "あなたのお店のウェブサイトを無料で作成します。必要な情報を入力するだけ。3営業日以内にデモをお届けします。",
  openGraph: {
    title: "無料ウェブサイトをリクエスト — AI Solutions",
    description:
      "あなたのお店のウェブサイトを無料で作成。必要な情報を入力するだけ。3営業日以内にデモをお届けします。",
    url: "https://aisolutions.jp/request",
  },
};

export default function RequestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-primary font-black text-xl tracking-tight">
              AI
            </span>
            <span className="text-gray-800 font-bold text-xl tracking-tight">
              Solutions
            </span>
          </Link>
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            aisolutions.jp
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              あなたのお店のウェブサイトを
              <br />
              <span className="text-primary">無料で作成します。</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              必要な情報を入力するだけ。
              <strong className="text-gray-800">3営業日以内</strong>
              にデモをお届けします。
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <IntakeForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
