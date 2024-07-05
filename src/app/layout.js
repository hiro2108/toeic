import "./globals.css";

export const metadata = {
  title: "Practice TOEIC No.5",
  description: "This site allows you to solve TOEIC No.5 practice questions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
