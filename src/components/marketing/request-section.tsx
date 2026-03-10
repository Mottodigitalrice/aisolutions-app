import { IntakeForm } from "./intake-form";

export function RequestSection() {
  return (
    <section id="request" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm tracking-wide mb-3">
            無料ウェブサイト制作
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            あなたのお店のウェブサイトをリクエスト
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            以下のフォームに情報を入力するだけ。
            <strong className="text-gray-800">3営業日以内</strong>
            にウェブサイトのデモをお送りします。費用は一切かかりません。
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 sm:p-8">
          <IntakeForm />
        </div>
      </div>
    </section>
  );
}
