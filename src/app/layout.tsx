import './globals.css';
import type { Metadata } from 'next';
import { RoomProvider } from '@/context/RoomContext';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  preload: true,
  subsets: ['latin'], // 또는 preload: false
  weight: ['100', '400', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

export const metadata: Metadata = {
  title: 'ZeroOneZero',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <RoomProvider>
          <div id="app">{children}</div>
        </RoomProvider>
      </body>
    </html>
  );
}
