import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const includedFeatures = [
  "プロフェッショナルなウェブサイト制作（無料）",
  "スマートフォン対応・日英バイリンガル",
  "更新作業すべて無料（メニュー・写真・営業時間・テキスト）",
  "SSL・サーバー・ドメイン管理すべて込み",
  "解約時はソースコードを全てお渡し",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide mb-3">
            料金
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            シンプルな料金、隠れた費用なし
          </h2>
        </div>

        {/* Single pricing card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-xl mx-auto">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-8 py-6 text-center">
            <p className="text-blue-200 text-sm font-medium mb-1">
              ウェブサイト制作＋管理プラン
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl sm:text-5xl font-black">
                &yen;58,800
              </span>
              <span className="text-blue-200 text-sm">（税込）</span>
            </div>
            <p className="text-blue-200 text-sm mt-2">
              最初の6ヶ月分 — ウェブサイト制作は無料
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-gray-900">
                  7ヶ月目以降:
                </span>
                <span className="text-2xl font-black text-primary">
                  &yen;9,800
                </span>
                <span className="text-gray-500 text-sm">/月（税込）</span>
              </div>
              <p className="text-gray-500 text-sm">
                いつでも解約可能・縛りなし
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="font-semibold text-gray-900 mb-4">
                すべて含まれています:
              </p>
              <ul className="space-y-3">
                {includedFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link href="#request">
                <Button className="w-full py-6 text-base font-bold rounded-xl shadow-lg shadow-primary/20">
                  無料でウェブサイトをリクエスト
                </Button>
              </Link>
              <p className="text-center text-gray-400 text-xs mt-3">
                または hello@aisolutions.jp までお気軽にどうぞ
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            ※ 6ヶ月の初期期間終了後は、月単位でいつでも解約いただけます。
            <br />※ 解約時にはウェブサイトの全ソースコードをお渡しします。
          </p>
        </div>
      </div>
    </section>
  );
}
