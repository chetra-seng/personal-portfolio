import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ThemeSwitch from "@/components/theme-switch";
import ActiveSectionContextProvider from "@/contexts/active-section-context";
import ThemeContextProvider from "@/contexts/theme-context";
import type { NavItem } from "@/models/navitem";
import type { SEO } from "@/models/seo";
import { cn } from "@/utils/cn";
import { client } from "@/utils/sanity";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navItems = await client.fetch<NavItem[]>(`*[_type == 'navitem'] | order(index) {
    _id, label, index, link
  }`);

  let isDarkMode = false;
  const cookiesStore = await cookies();

  if (!cookiesStore.has("theme")) {
    // Default to dark mode
    // Prevent flash of light mode when theme cookie is empty
    isDarkMode = true;
  } else {
    isDarkMode = cookiesStore.get("theme")?.value === "dark";
  }

  return (
    <html lang="en" className={cn("relative overscroll-none scroll-smooth", { dark: isDarkMode })}>
      <body
        className={`${inter.className} relative bg-gray-50 pt-28 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 sm:pt-36`}
      >
        <ThemeContextProvider theme={isDarkMode ? "dark" : "light"}>
          <ActiveSectionContextProvider>
            <Header items={navItems} />
            <div className="absolute right-[11rem] top-[-6rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem] animate-[blurMove1_12s_ease-in-out_infinite_alternate]" />
            <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[30rem] w-[46rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] animate-[blurMove2_14s_ease-in-out_infinite_alternate]" />
            {children}
            <Footer />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
