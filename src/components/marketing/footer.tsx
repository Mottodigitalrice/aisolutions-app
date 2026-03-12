import Link from "next/link";

export function Footer() {
  return (
    <footer className="section-dark relative">
      {/* Animated gradient line separator */}
      <div className="gradient-line" />

      <div className="px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            {/* Logo + contact */}
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-1.5 mb-3 justify-center sm:justify-start">
                <span className="text-[#818cf8] font-black text-xl font-[var(--font-inter)]">
                  AI
                </span>
                <span className="text-white font-bold text-xl">Solutions</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">hello@aisolutions.jp</p>
              <p className="text-gray-500 text-sm">aisolutions.jp</p>
            </div>

            {/* Nav links */}
            <div className="flex gap-6 text-sm">
              <Link
                href="#showcase"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                実績
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                仕組み
              </Link>
              <Link
                href="#pricing"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                料金
              </Link>
              <Link
                href="#faq"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                FAQ
              </Link>
            </div>

            {/* Legal */}
            <div className="text-center sm:text-right">
              <div className="flex gap-4 text-xs justify-center sm:justify-end mb-2">
                <Link
                  href="/tokushoho"
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  特定商取引法に基づく表記
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </div>
              <p className="text-xs text-gray-600 mb-1">
                &copy; {new Date().getFullYear()} AI Solutions. All rights
                reserved.
              </p>
              <p className="text-xs text-gray-600">
                運営:{" "}
                <Link
                  href="https://mottodigital.jp"
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Multidigital合同会社
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
