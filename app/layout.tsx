import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { generateSEO } from '@/lib/seo';
import Sidebar from '@/components/explore/sidebar';
import FooterLogo from '@/components/logo/footer-logo';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
export const metadata: Metadata = {
  title: 'Directory Explorer',
  description: 'Directory for directory apps',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=" h-full w-full scroll-smooth">
          <div className="flex flex-col lg:flex-row ">
            <div className="w-full md:w-64 md:flex-shrink-0">
              <Sidebar />
            </div>
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
              {children}
            </main>
          </div>
          <div className="flex items-center justify-between bg-black text-white p-4  ">
            <span className="text-sm font-normal pl-3">
              <FooterLogo />
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}
