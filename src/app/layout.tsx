import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ClerkClientProvider } from "@/components/providers/clerk-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    default: "AI Solutions — あなたのお店の新しいウェブサイト",
    template: "%s — AI Solutions",
  },
  description:
    "あなたのお店専用のウェブサイトを先に作成し、ご確認いただいてからお申し込み。月額9,800円で更新もすべてお任せ。初期費用0円。",
  metadataBase: new URL("https://aisolutions.jp"),
  openGraph: {
    title: "AI Solutions — あなたのお店の新しいウェブサイト",
    description:
      "あなたのお店専用のウェブサイトを先に作成。月額9,800円で更新もすべてお任せ。初期費用0円。",
    url: "https://aisolutions.jp",
    siteName: "AI Solutions",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions — あなたのお店の新しいウェブサイト",
    description:
      "あなたのお店専用のウェブサイトを先に作成。月額9,800円で更新もすべてお任せ。初期費用0円。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className={notoSansJP.className}>
        <ClerkClientProvider>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </ClerkClientProvider>
      </body>
    </html>
  );
}
