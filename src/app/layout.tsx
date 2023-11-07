"use client";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from './theme';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <RecoilRoot>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </RecoilRoot>
    </ThemeProvider>
  );
}
