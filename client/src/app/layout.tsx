import "@/src/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { VscCopy } from "react-icons/vsc";
import { VscGithubAlt } from "react-icons/vsc";
import { IoCodeSlashOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import TopNavbar from "../components/shared/TopNavbar";
import Footer from "../components/shared/Footer";
import Sidebar from "../components/shared/Sidebar";
import FileExplorer from "../components/shared/FileExplorer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

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
          "min-h-screen bg-gray-900 text-gray-100 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* Root layout mimicking VS Code */}
          <div className="flex h-screen">


            {/* Main Content */}
            <div className="flex flex-col flex-grow">
              {/* Top Navigation Bar */}
              <TopNavbar />

              {/* Main Editor Area */}
              <main className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar />

                {/* File Explorer */}
                <FileExplorer />

                {/* Editor */}
                <section className="flex-grow">
                  <div className="bg-[#1F2428] px-4 py-2">
                    nav
                  </div>
                  {children}
                </section>
              </main>
              {/* Bottom Status Bar */}
              <Footer />

            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
