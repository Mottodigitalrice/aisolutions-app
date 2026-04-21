"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/marketing/footer";
import { TidyCalEmbed } from "@/components/marketing/tidycal-embed";
import {
  Check,
  ExternalLink,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Code2,
  Clock,
  MessageCircle,
} from "lucide-react";

const TIDYCAL_PATH = "rice/aisolutions-website";
const TIDYCAL_FALLBACK_URL = `https://tidycal.com/${TIDYCAL_PATH}`;

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

  // Not found — graceful fallback that still funnels to a meeting
  if (lead === null) {
    return (
      <div className="min-h-screen section-dark flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-[#818cf8]" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          このデモは見つかりませんでした
        </h1>
        <p className="text-gray-400 mb-6 max-w-sm">
          リンクが正しくない可能性があります。
          ご興味があれば、直接ミーティングをご予約ください。
        </p>
        <a href={TIDYCAL_FALLBACK_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white">
            <CalendarCheck className="w-4 h-4 mr-2" />
            15分のミーティングを予約
          </Button>
        </a>
      </div>
    );
  }

  const liveDemoUrl = lead.demoUrl;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="section-dark border-b border-white/5 sticky top-0 z-40 backdrop-blur-md bg-[#0a0a0f]/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a
            href="https://aisolutions-app.vercel.app/#request"
            className="flex items-center gap-1.5"
          >
            <span className="text-[#818cf8] font-black text-xl font-[var(--font-inter)]">
              AI
            </span>
            <span className="text-white font-bold text-xl">Solutions</span>
          </a>
          <a href="#book">
            <Button
              size="sm"
              className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white font-semibold shadow-lg shadow-indigo-500/20"
            >
              <CalendarCheck className="w-4 h-4 mr-1.5" />
              ミーティングを予約
            </Button>
          </a>
        </div>
      </header>

      {/* Hero — assumes the visitor already saw their demo */}
      <section className="section-dark relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-sm text-gray-300 font-medium">
              {lead.businessName}様のデモサイト
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
            デモは
            <span className="gradient-text">いかがでしたか？</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            気に入っていただけたら、
            <span className="text-white font-semibold">15分のミーティング</span>
            で詳細をお話しします。
            内容のカスタマイズ、ご質問、料金について、すべてその場でお答えします。
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="#book">
              <Button
                size="lg"
                className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white font-semibold px-8 shadow-lg shadow-indigo-500/20"
              >
                <CalendarCheck className="w-5 h-5 mr-2" />
                15分のミーティングを予約
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/20 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  デモをもう一度見る
                </Button>
              </a>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              所要時間 15分
            </span>
            <span>·</span>
            <span>無料</span>
            <span>·</span>
            <span>強引な営業なし</span>
          </div>
        </div>
      </section>

      {/* Primary CTA — TidyCal booking */}
      <section
        id="book"
        className="section-dark py-12 sm:py-16 px-4 sm:px-6 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#06b6d4] font-semibold text-sm mb-2 font-[var(--font-inter)]">
              STEP 1
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
              ご都合の良い日時を選んでください
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Google MeetまたはZoomで、15分のオンラインミーティングを行います。
            </p>
          </div>

          <TidyCalEmbed path={TIDYCAL_PATH} />

          <div className="mt-6 text-center">
            <a
              href={TIDYCAL_FALLBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#818cf8] hover:text-[#a5b4fc] transition-colors"
            >
              カレンダーが表示されない場合はこちら
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* What we'll cover */}
      <section className="section-dark py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 text-center">
            ミーティングで話すこと
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center mb-3">
                <MessageCircle className="w-5 h-5 text-[#22d3ee]" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1.5">
                デモのご感想
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                デザイン、写真、文章 — 変更したい部分をお聞かせください。
              </p>
            </div>
            <div className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center mb-3">
                <RefreshCw className="w-5 h-5 text-[#22d3ee]" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1.5">
                カスタマイズ内容
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                メニュー、写真、営業時間など、お店に合わせた調整方法をご説明します。
              </p>
            </div>
            <div className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-[#22d3ee]" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1.5">
                料金とご契約
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                月額9,800円の内訳、解約条件、ドメイン引き継ぎなど、すべてご説明します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="section-dark py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#06b6d4] font-semibold text-sm mb-2 font-[var(--font-inter)]">
            料金
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
            月額9,800円ですべて込み
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
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
          <a href="#book">
            <Button
              size="lg"
              className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white font-semibold px-8 shadow-lg shadow-indigo-500/20"
            >
              <CalendarCheck className="w-4 h-4 mr-2" />
              ミーティングを予約する
            </Button>
          </a>
        </div>
      </section>

      {/* What's included — trust */}
      <section className="section-dark py-16 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-8 text-center">
            このウェブサイトに含まれるもの
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5 text-[#22d3ee]" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">
                リスクゼロ
              </h3>
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
              <h3 className="font-semibold text-white text-sm mb-1">
                コード引き渡し
              </h3>
              <p className="text-gray-500 text-xs">
                解約時に全ソースコードをお渡し
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store info — only if we have it */}
      {(lead.address || lead.phone) && (
        <section className="section-dark py-12 px-4 sm:px-6 border-t border-white/5">
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
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    電話番号
                  </p>
                  <p className="text-sm text-gray-200">{lead.phone}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sticky bottom CTA bar */}
      <div className="sticky bottom-0 z-50 section-dark border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-sm sm:text-base text-center sm:text-left">
            {lead.businessName}様のサイトについて話しませんか？
          </p>
          <div className="flex gap-3">
            <a href="#book">
              <Button className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white font-semibold px-6 shadow-lg shadow-indigo-500/20">
                <CalendarCheck className="w-4 h-4 mr-2" />
                予約する
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="mailto:hello@aisolutions.jp">
              <Button
                variant="outline"
                className="rounded-full border-white/20 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent hidden sm:inline-flex"
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
