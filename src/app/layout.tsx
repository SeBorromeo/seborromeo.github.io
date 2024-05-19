import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sebastian Borromeo - Computer Science Student",
  description: "Sebastian Borromeo is a rising fourth-year student studying Computer Science and Data Science at The Universiity of Virginia. Explore my portfolio to see my latest projects and work!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
