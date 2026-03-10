import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-gray-900 mb-6">
          あなたのお店の新しいウェブサイト、
          <br />
          <span className="text-primary">もう出来ています。</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
          私たちはお店を見つけて、先にウェブサイトを作成します。
          <br className="hidden sm:block" />
          気に入っていただけたら、そのままお使いください。
        </p>
        <p className="text-gray-400 text-sm mb-10">
          初期費用0円。ウェブサイト制作は無料です。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#how-it-works">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/20 font-bold"
            >
              仕組みを見る
            </Button>
          </Link>
          <Link href="#pricing">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl font-semibold border-2"
            >
              料金プラン
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
