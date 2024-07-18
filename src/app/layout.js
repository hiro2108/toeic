import "./globals.css";

export const metadata = {
  title: "TOEIC No.5 練習問題",
  description: "TOEIC No.5の練習問題が解けるWebアプリです。",
  openGraph: {
    images: 'https://toeic-five.vercel.app/og-image.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
