import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { client } from "@/utils/sanity";
import { NavItem } from "@/models/navitem";
import ActiveSectionContextProvider from "@/contexts/ActiveSectionContext";
import Footer from "@/components/Footer";
import ThemeSwitch from "@/components/ThemeSwitch";
import ThemeContextProvider from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 3600;

export const metadata: Metadata = {
	metadataBase: new URL("https://chetraseng.com"),
	title: "Chetra | Personal Portfolio",
	description:
		"A full-stack developer who's constantly fueling his passion for learning.",
	openGraph: {
		title: "Chetra | Personal Portfolio",
		description:
			"A full-stack developer who's constantly fueling his passion for learning.",
		images: {
			url: "/og.jpeg",
			alt: "Chetra Seng",
			width: 540,
			height: 630,
			type: "image/jpeg",
		},
	},
	twitter: {
		title: "Chetra | Personal Portfolio",
		description:
			"A full-stack developer who's constantly fueling his passion for learning.",
		images: {
			url: "/og.jpeg",
			alt: "Chetra Seng",
			width: 540,
			height: 630,
		},
		creator: "@chetra_seng",
	},
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
		<html lang="en" className="overscroll-none scroll-smooth">
			<body
				className={`${inter.className} relative bg-gray-50 pt-28 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 sm:pt-36`}
			>
				<ThemeContextProvider>
					<ActiveSectionContextProvider>
						<div className="absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]" />
						<div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />
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
