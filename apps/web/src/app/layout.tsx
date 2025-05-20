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
import { SEO } from "@/models/seo";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await client.fetch<SEO>(`
	*[_type == "seo"][0] {
		title, description, keywords,
		ogTitle, ogDescription, 
		"ogImage": ogImage.asset->url,
		ogImageAlt, ogImageType,
		ogImageWidth, ogImageHeight,
		twitterTitle, twitterDescription,
		"twitterImage": twitterImage.asset->url, 
		twitterImageAlt,
		twitterImageWidth, twitterImageHeight,
		twitterCreator
	}
	`);

  return {
    metadataBase: new URL(process.env.WEB_URL as string),
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      images: {
        url: `${metadata.ogImage}?h=${metadata.ogImageHeight}`,
        alt: metadata.ogImageAlt,
        width: metadata.ogImageWidth,
        height: metadata.ogImageHeight,
        type: metadata.ogImageType,
      },
    },
    twitter: {
      title: metadata.twitterTitle,
      description: metadata.twitterDescription,
      images: {
        url: `${metadata.twitterImage}?h=${metadata.twitterImageHeight}`,
        alt: metadata.twitterImageAlt,
        width: metadata.twitterImageWidth,
        height: metadata.twitterImageHeight,
      },
      creator: metadata.twitterCreator,
    },
  };
}

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
            <Header items={navItems} />
            <BackgroundGradientAnimation />
            {children}
            <Footer />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
