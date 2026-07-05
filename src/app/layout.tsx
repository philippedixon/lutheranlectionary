import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import localFont from "next/font/local";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";
import { SelectionsProvider, ThemeProvider } from "@/app/contexts";
import {
	DarkModeToggle,
	LanguageDropdown,
	TranslationsDropdownServerComponent,
} from "@/app/components";
import { Home } from "lucide-react";

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

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["500", "600"],
	style: ["normal", "italic"],
	variable: "--font-cormorant",
	display: "swap",
});

const ebGaramond = EB_Garamond({
	subsets: ["latin"],
	weight: ["400", "600"],
	style: ["normal", "italic"],
	variable: "--font-eb-garamond",
	display: "swap",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// check localStorage for selections, sync with context

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${ebGaramond.variable} antialiased`}
			>
				<ThemeProvider>
				<SelectionsProvider>
					<div className="flex flex-col items-center gap-4 pb-4" id="top">
						<nav className="flex items-center justify-between w-full max-w-[350px] mx-auto px-4 pt-4">
							<Link href="/" aria-label="Home"><Home size={24} /></Link>
							<DarkModeToggle />
						</nav>
						<div className="w-full max-w-[350px] mx-auto px-4 flex flex-col gap-4">
							<LanguageDropdown />
							<TranslationsDropdownServerComponent />
						</div>
					</div>
					{children}
				</SelectionsProvider>
				</ThemeProvider>
				<GoogleAnalytics gaId="G-GFXVNJNTHD" />
			</body>
		</html>
	);
}
