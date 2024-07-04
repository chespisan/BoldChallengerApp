import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "app/presentation/styles/globals.scss";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bold App",
  description: "Bold Challenger App",
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
