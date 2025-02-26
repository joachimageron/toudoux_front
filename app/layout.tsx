import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/components/Providers";

export const metadata: Metadata = {
  title: "Toudoux !",
  description: "Une super application de prise de notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'h-screen'}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
