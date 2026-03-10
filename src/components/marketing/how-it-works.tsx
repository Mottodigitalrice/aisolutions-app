const steps = [
  {
    number: 1,
    title: "お店を見つけて、改善点を確認します",
    description:
      "私たちが地域のお店を調べ、ウェブサイトが古い・ない・改善できそうなお店をお探しします。お客様からのご連絡は不要です。",
  },
  {
    number: 2,
    title: "新しいウェブサイトを無料で作成します",
    description:
      "お店の情報をもとに、モダンなウェブサイトを作成。スマホ対応・日英対応・高速表示。まずはご覧いただき、気に入るかどうかご判断ください。制作費は無料です。",
  },
  {
    number: 3,
    title: "気に入ったら、月額管理でそのままスタート",
    description:
      "気に入っていただけたら、月額9,800円の管理プランにお申し込み。メニュー変更・写真差し替え・営業時間更新など、すべての更新作業が含まれています。",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide mb-3">
            仕組み
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            お客様にしていただくことは、ほぼありません
          </h2>
        </div>

        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 shadow-md">
                {step.number}
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
