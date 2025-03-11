import "./globals.css";
import { GeistMono } from "geist/font/mono";
import "katex/dist/katex.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>{children}</body>
    </html>
  );
}
