import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import { SelectionsProvider } from "@/app/contexts";
import { TranslationsProvider } from "@/app/contexts";
import { LanguageDropdown, TranslationDropdown } from "@/app/components";
import { fetchAvailableTranslations } from "@/app/utils";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// check localStorage for selections, sync with context
	const availableTranslations = await fetchAvailableTranslations();

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TranslationsProvider translations={availableTranslations.translations}>
					<SelectionsProvider>
						<nav>
							<Link href="/">Home</Link>
						</nav>
						<div>
							<LanguageDropdown />
						</div>
						<div>
							<TranslationDropdown />
						</div>
						{children}
					</SelectionsProvider>
				</TranslationsProvider>
			</body>
		</html>
	);
}
