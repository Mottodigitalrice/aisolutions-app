"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/marketing/footer";
import {
  Check,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Code2,
} from "lucide-react";

export default function DemoSitePage() {
  const params = useParams();
  const slug = params.slug as string;

  const lead = useQuery(api.functions.leads.getBySlug, { slug });

  // Loading state
  if (lead === undefined) {
    return (
      <div className="min-h-screen section-dark">
        <header className="border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center h-16">
            <div className="flex items-center gap-1.5">
              <span className="text-[#818cf8] font-black text-xl font-[var(--font-inter)]">
                AI
              </span>
              <span className="text-white font-bold text-xl">Solutions</span>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-lg w-full space-y-6">
            <Skeleton className="h-12 w-3/4 mx-auto bg-white/5" />
            <Skeleton className="h-6 w-full bg-white/5" />
            <Skeleton className="h-6 w-2/3 mx-auto bg-white/5" />
            <Skeleton className="h-64 w-full rounded-xl bg-white/5" />
          </div>
        </main>
      </div>
    );
  }

  // Not found
  if (lead === null) {
    return (
      <div className="min-h-screen section-dark flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-[#818cf8]" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          ページが見つかりません
        </h1>
        <p className="text-gray-400 mb-6">
          このデモサイトは存在しないか、削除されました。
        </p>
        <Link href="/">
          <Button className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white">
            トップページに戻る
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="section-dark border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-[#818cf8] font-black text-xl font-[var(--font-inter)]">
              AI
            </span>
            <span className="text-white font-bold text-xl">Solutions</span>
          </Link>
          <span className="text-xs text-[#06b6d4] bg-[#06b6d4]/10 px-3 py-1 rounded-full font-medium border border-[#06b6d4]/20">
            デモサイト
          </span>
        </div>
      </header>

      {/* Hero intro for this business */}
      <section className="section-dark relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-sm text-gray-300 font-medium">
              {lead.businessName}様のために制作しました
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {lead.businessName}の
            <br />
            <span className="gradient-text">新しいウェブサイト</span>
          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            お店の魅力が伝わるモダンなウェブサイトを制作しました。
            気に入っていただけたら、そのままお使いいただけます。
          </p>

          {lead.category && (
            <span className="inline-block bg-[#6366f1]/10 text-[#818cf8] text-sm font-medium px-4 py-1.5 rounded-full border border-[#6366f1]/20">
              {lead.category}
            </span>
          )}
        </div>
      </section>

      {/* Demo site embed / placeholder */}
      <section className="section-dark py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="gradient-border overflow-hidden">
            <div className="p-1">
              <div className="rounded-[0.875rem] overflow-hidden">
                {/* Browser chrome */}
                <div className="bg-[#1a1a2e] px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-gray-500 ml-2 font-mono">
                    {slug}.aisolutions.jp
                  </div>
                </div>

                {/* Content placeholder */}
                <div className="bg-[#14141f] aspect-[16/9] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400 text-lg font-medium mb-2">
                      ウェブサイトプレビュー
                    </p>
                    <p className="text-gray-600 text-sm max-w-sm mx-auto">
                      こちらにお店のウェブサイトが表示されます。メニュー、写真、アクセス情報など、すべてカスタムデザインで制作します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section-dark py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-8 text-center">
            このウェブサイトに含まれるもの
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5 text-[#22d3ee]" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">リスクゼロ</h3>
              <p className="text-gray-500 text-xs">
                気に入らなければ費用は一切なし
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-5 h-5 text-[#22d3ee]" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">更新無料</h3>
              <p className="text-gray-500 text-xs">
                メニュー・写真・営業時間の変更すべて無料
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center mx-auto mb-3">
                <Code2 className="w-5 h-5 text-[#22d3ee]" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">コード引き渡し</h3>
              <p className="text-gray-500 text-xs">
                解約時に全ソースコードをお渡し
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info */}
      {(lead.address || lead.phone || lead.website) && (
        <section className="section-dark py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-white mb-6 text-center">
              店舗情報
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {lead.address && (
                <div className="glass-card p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">住所</p>
                  <p className="text-sm text-gray-200">{lead.address}</p>
                </div>
              )}
              {lead.phone && (
                <div className="glass-card p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">電話番号</p>
                  <p className="text-sm text-gray-200">{lead.phone}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pricing teaser */}
      <section className="section-dark py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            月額9,800円ですべて込み
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            最初の6ヶ月分58,800円（税込）でスタート。7ヶ月目以降は月額9,800円、いつでも解約可能。
          </p>
          <ul className="space-y-3 text-left max-w-sm mx-auto mb-10">
            {[
              "ウェブサイト制作無料",
              "更新作業すべて無料",
              "スマホ対応・高速表示",
              "SSL・サーバー管理込み",
              "解約時コード引き渡し",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-gray-300"
              >
                <div className="w-5 h-5 rounded-full bg-[#6366f1]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#818cf8]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sticky CTA bar */}
      <div className="sticky bottom-0 z-50 section-dark border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-sm sm:text-base text-center sm:text-left">
            このウェブサイトを使いませんか？
          </p>
          <div className="flex gap-3">
            <Link href="/request">
              <Button className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white font-semibold px-6 shadow-lg shadow-indigo-500/20">
                このサイトを使う
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="mailto:hello@aisolutions.jp">
              <Button
                variant="outline"
                className="rounded-full border-white/20 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                質問する
              </Button>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
