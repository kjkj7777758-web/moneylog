import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://money-log.company'),
  title: {
    default: '머니로그 - 똑똑한 경제생활 가이드',
    template: '%s - 머니로그',
  },
  description: '경제와 재테크 정보를 쉽고 정확하게 전달하는 블로그. 저축, 투자, 부동산, 절약 팁, 경제 상식까지 한곳에서 만나보세요.',
  keywords: ['재테크', '경제', '저축', '투자', '주식', 'ETF', '부동산', '절약', '가계부', '금리', '환율'],
  authors: [{ name: '머니로그' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '머니로그',
    title: '머니로그 - 똑똑한 경제생활 가이드',
    description: '경제와 재테크 정보를 쉽고 정확하게 전달하는 블로그',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'TtdX72c6EZ08YiFKmgouKeISDNDRECJua3aqEED8fGc',
    other: {
      'naver-site-verification': ['e4c3829235b8bf25808676f3aa628faab1ff5439'],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B2SXMD8FGC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B2SXMD8FGC');
          `}
        </Script>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3774274080171066"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
      </body>
    </html>
  );
}
