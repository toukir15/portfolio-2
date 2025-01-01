import "@/src/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { fontMono } from "@/src/config/fonts";
import TopNavbar from "../components/shared/TopNavbar";
import Footer from "../components/shared/Footer";
import Sidebar from "../components/shared/Sidebar";
import FileExplorer from "../components/shared/FileExplorer";
import { Providers } from "../lib/providers";
import Navlink from "../components/Navlink";

export const metadata: Metadata = {
  title: {
    default: "Toukir Ahmed",
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/vscode.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning lang="en">
      <head>

      </head>
      <body
        className={clsx(
          "h-screen bg-[#24292E] text-gray-100 font-mono antialiased",
          fontMono.variable
        )}
      >
        <Providers>
          {/* Root layout mimicking VS Code */}
          <div className="flex h-screen">
            {/* Main Content */}
            <div className="flex flex-col flex-grow">
              {/* Top Navigation Bar */}
              <TopNavbar />

              {/* Main Editor Area */}
              <main className="flex flex-grow ">
                {/* Sidebar */}
                <div className="hidden xl:block">
                  <Sidebar />
                </div>

                {/* File Explorer */}
                <div className="bg-[#1F2428] border-r hidden md:block border-[#131618]">
                  <FileExplorer />
                </div>

                {/* Editor */}
                <section className="flex-grow">
                  <div className="w-screen md:w-[calc(100vw-165px)] xl:w-full">
                    <Navlink />
                  </div>
                  <div className="h-[calc(100vh-100px)] overflow-y-scroll ">
                    {children}
                  </div>
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
