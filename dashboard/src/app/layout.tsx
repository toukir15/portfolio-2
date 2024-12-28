"use client"
import "@/src/styles/globals.css";
import clsx from "clsx";
import { fontSans } from "@/src/config/fonts";
import "@/src/styles/globals.css";
import { Providers } from "../lib/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "h-screen bg-gray-900 text-gray-100 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="bg-white">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
