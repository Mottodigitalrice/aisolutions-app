import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "AI Solutions（運営: 株式会社Mottodigital）のプライバシーポリシーです。",
  openGraph: {
    title: "プライバシーポリシー — AI Solutions",
    description:
      "AI Solutions（運営: 株式会社Mottodigital）のプライバシーポリシーです。",
    url: "https://aisolutions.jp/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar lightBackground />

      <main className="section-light pt-28 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-4">
            プライバシーポリシー
          </h1>
          <p className="text-sm text-gray-500 mb-12">
            最終更新日:{" "}
            <span className="font-[var(--font-inter)]">2026</span>年
            <span className="font-[var(--font-inter)]">3</span>月
            <span className="font-[var(--font-inter)]">12</span>日
          </p>

          <p className="text-sm text-gray-700 leading-relaxed mb-12">
            株式会社Mottodigital（以下「当社」）は、AI
            Solutionsウェブサイト制作サービス（以下「本サービス」）における個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
          </p>

          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  1.
                </span>
                個人情報の定義
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                本ポリシーにおいて「個人情報」とは、個人情報の保護に関する法律（個人情報保護法）に定める個人情報を指し、生存する個人に関する情報であって、氏名、メールアドレス、電話番号その他の記述により特定の個人を識別できるものをいいます。
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  2.
                </span>
                収集する情報
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                当社は、本サービスの提供にあたり、以下の情報を収集することがあります。
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  お名前（店舗名・事業者名を含む）
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  メールアドレス
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  電話番号
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  事業に関する情報（業種、所在地、ウェブサイトURL等）
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  3.
                </span>
                利用目的
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                当社は、収集した個人情報を以下の目的で利用いたします。
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  本サービスの提供・運営
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  お問い合わせへの対応・ご連絡
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  サービスの改善・新機能の開発
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  利用規約に違反する行為への対応
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  4.
                </span>
                第三者提供
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mt-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  お客様の同意がある場合
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  法令に基づく場合
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1 flex-shrink-0">
                    &bull;
                  </span>
                  人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を得ることが困難である場合
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  5.
                </span>
                安全管理措置
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                当社は、個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。個人情報を取り扱う従業者や委託先に対して、必要かつ適切な監督を行います。
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  6.
                </span>
                開示・訂正・削除の請求
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                お客様は、当社に対してご自身の個人情報の開示、訂正、追加、削除、利用停止または消去を請求することができます。ご請求の際は、下記のお問い合わせ窓口までご連絡ください。ご本人確認のうえ、合理的な期間内に対応いたします。
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  7.
                </span>
                Cookieの使用
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                本サービスでは、サービスの利便性向上やアクセス解析のためにCookieを使用する場合があります。Cookieにより個人を特定できる情報を収集することはありません。ブラウザの設定によりCookieの受け取りを拒否することも可能ですが、一部の機能がご利用いただけなくなる場合があります。
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  8.
                </span>
                プライバシーポリシーの変更
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                当社は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。重要な変更がある場合は、サービス上でお知らせいたします。
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-baseline gap-2">
                <span className="text-[#6366f1] font-[var(--font-inter)] font-black">
                  9.
                </span>
                お問い合わせ窓口
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div className="mt-4 bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-900 font-bold mb-2">
                  株式会社Mottodigital
                </p>
                <p className="text-sm text-gray-700">
                  AI Solutions 個人情報お問い合わせ窓口
                </p>
                <p className="text-sm mt-2">
                  <a
                    href="mailto:hello@aisolutions.jp"
                    className="text-[#6366f1] hover:underline font-[var(--font-inter)]"
                  >
                    hello@aisolutions.jp
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
