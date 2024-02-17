import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { client } from "@/utils/sanity";
import { NavItem } from "@/models/navitem";
import ActiveSectionContextProvider from "@/contexts/ActiveSectionContext";
import Footer from "@/components/Footer";
import ThemeSwitch from "@/components/ThemeSwitch";
import ThemeContextProvider, { ThemeContext } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chetra | Personal Portfolio",
  description: "Chetra is a full-stack developer",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await client.fetch<
    NavItem[]
  >(`*[_type == 'navitem'] | order(index) {
    _id, label, index, link
  }`);

  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-950 dark:text-gray-50 relative pt-28 sm:pt-36 dark:text-opacity-90`}
      >
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <div className="-z-10 bg-[#fbe2e3] dark:bg-[#946263] absolute top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]" />
            <div className="-z-10 bg-[#dbd7fb] dark:bg-[#676394] absolute top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />
            <Header items={navItems} />
            {children}
            <Footer />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
