import { Card, CardContent } from "@/components/ui/card";
import {
  Smartphone,
  Languages,
  Zap,
  ShieldCheck,
  RefreshCw,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "モダンなデザイン",
    description:
      "スマートフォン・タブレット・パソコン、どのデバイスでも美しく表示されます。",
  },
  {
    icon: Languages,
    title: "日本語・英語対応",
    description:
      "バイリンガル対応で、外国人のお客様にもお店の情報を届けられます。",
  },
  {
    icon: Zap,
    title: "高速表示",
    description:
      "ページの読み込みが速く、お客様を待たせません。SEOにも有利です。",
  },
  {
    icon: ShieldCheck,
    title: "SSL暗号化",
    description:
      "安全な通信を標準装備。お客様も安心してアクセスできます。",
  },
  {
    icon: RefreshCw,
    title: "更新作業すべて無料",
    description:
      "メニュー変更、写真差し替え、営業時間の更新。すべて月額に含まれています。",
  },
  {
    icon: Globe,
    title: "独自ドメイン対応",
    description:
      "お店専用のURLで公開。既存のドメインがあればそのままご利用いただけます。",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide mb-3">
            含まれるもの
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            すべてコミコミ、追加費用なし
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-gray-50 border-gray-100 rounded-xl"
            >
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
