import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-1.5 mb-2 justify-center sm:justify-start">
              <span className="text-blue-400 font-black text-lg">AI</span>
              <span className="text-white font-bold text-lg">Solutions</span>
            </div>
            <p className="text-sm">hello@aisolutions.jp</p>
            <p className="text-sm">aisolutions.jp</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs text-gray-500 mb-1">
              &copy; {new Date().getFullYear()} AI Solutions. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-500">
              運営:{" "}
              <Link
                href="https://mottodigital.jp"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Multidigital合同会社
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
