"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/marketing/footer";

export default function DemoSitePage() {
  const params = useParams();
  const slug = params.slug as string;

  const lead = useQuery(api.functions.leads.getBySlug, { slug });

  // Loading state
  if (lead === undefined) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center h-16">
            <div className="flex items-center gap-1.5">
              <span className="text-primary font-black text-xl tracking-tight">
                AI
              </span>
              <span className="text-gray-800 font-bold text-xl tracking-tight">
                Solutions
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-lg w-full space-y-6">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  // Not found
  if (lead === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ページが見つかりません
        </h1>
        <p className="text-gray-600 mb-6">
          このデモサイトは存在しないか、削除されました。
        </p>
        <Link href="/">
          <Button>トップページに戻る</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Demo site header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-1.5">
            <span className="text-primary font-black text-xl tracking-tight">
              AI
            </span>
            <span className="text-gray-800 font-bold text-xl tracking-tight">
              Solutions
            </span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            デモサイト
          </span>
        </div>
      </header>

      {/* Demo site content */}
      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
              {lead.businessName}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              このサイトは{lead.businessName}
              様のために作成されました
            </p>
            {lead.category && (
              <span className="inline-block bg-blue-100 text-primary text-sm font-medium px-4 py-1 rounded-full">
                {lead.category}
              </span>
            )}
          </div>
        </section>

        {/* Placeholder content area */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-2xl p-12 text-center">
              <p className="text-gray-500 text-lg font-medium mb-2">
                ウェブサイトコンテンツ
              </p>
              <p className="text-gray-400 text-sm">
                こちらにお店の詳細情報、メニュー、アクセス情報などが表示されます。
              </p>
            </div>
          </div>
        </section>

        {/* Contact info if available */}
        {(lead.address || lead.phone || lead.website) && (
          <section className="py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                店舗情報
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                {lead.address && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      住所
                    </p>
                    <p className="text-sm text-gray-900">{lead.address}</p>
                  </div>
                )}
                {lead.phone && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      電話番号
                    </p>
                    <p className="text-sm text-gray-900">{lead.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* CTA bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 font-semibold text-sm sm:text-base text-center sm:text-left">
            このウェブサイトが気に入りましたか？
          </p>
          <div className="flex gap-3">
            <Link href="/request">
              <Button className="rounded-lg font-semibold">
                無料でリクエスト
              </Button>
            </Link>
            <Link href="mailto:hello@aisolutions.jp">
              <Button variant="outline" className="rounded-lg font-semibold">
                お問い合わせ
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
