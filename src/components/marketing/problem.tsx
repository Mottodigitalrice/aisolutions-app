import { Card, CardContent } from "@/components/ui/card";

const problems = [
  {
    title: "ホームページが古いまま",
    description:
      "何年も前に作ったきり、スマホで見ると崩れている。お客様に良い印象を与えられていない。",
  },
  {
    title: "制作会社は高すぎる",
    description:
      "見積もりを取ると30万円以上。小規模なお店にとっては大きな出費で、なかなか踏み出せない。",
  },
  {
    title: "自分で作る時間がない",
    description:
      "WixやWordPressを試しても、操作を覚える時間がない。本業が忙しく、途中で止まってしまう。",
  },
  {
    title: "お客様を逃しているかも",
    description:
      "検索しても出てこない、見つけても情報が古い。新しいお客様がお店を選べない状態になっている。",
  },
];

export function Problem() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide mb-3">
            こんなお悩みはありませんか？
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            ウェブサイトの問題、よく聞きます
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {problems.map((problem) => (
            <Card
              key={problem.title}
              className="bg-gray-50 border-gray-100 rounded-2xl"
            >
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
