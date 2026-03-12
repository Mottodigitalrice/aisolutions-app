import type { Metadata } from "next";
import Link from "next/link";
import { OnboardingWizard } from "@/components/marketing/onboarding-wizard";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "無料ウェブサイトをリクエスト",
  description:
    "あなたのお店のウェブサイトを無料で作成します。簡単な質問に答えるだけ。3営業日以内にデモをお届けします。",
  openGraph: {
    title: "無料ウェブサイトをリクエスト — AI Solutions",
    description:
      "あなたのお店のウェブサイトを無料で作成。簡単な質問に答えるだけ。3営業日以内にデモをお届けします。",
    url: "https://aisolutions.jp/request",
  },
};

export default function RequestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header — dark to match page */}
      <header className="bg-[#0a0a0f] border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-[#818cf8] font-black text-xl tracking-tight font-[var(--font-inter)]">
              AI
            </span>
            <span className="text-white font-bold text-xl tracking-tight">
              Solutions
            </span>
          </Link>
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors"
          >
            aisolutions.jp
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 section-dark relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
              あなたのお店のウェブサイトを
              <br />
              <span className="gradient-text">無料で作成します。</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              簡単な質問に答えるだけ。
              <span className="text-white font-semibold">3営業日以内</span>
              にデモをお届けします。
            </p>
          </div>

          <div className="glass-card p-6 sm:p-8">
            <OnboardingWizard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
