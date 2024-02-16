import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { client } from "@/utils/sanity";
import { NavItem } from "@/model/navitem";
import ActiveSectionContextProvider from "@/contexts/ActiveSectionContext";

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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36`}
      >
        <ActiveSectionContextProvider>
          <div className="-z-10 bg-[#fbe2e3] absolute top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]" />
          <div className="-z-10 bg-[#dbd7fb] absolute top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />
          <Header items={navItems} />
          {children}
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
