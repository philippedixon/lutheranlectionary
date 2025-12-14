import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import { SelectionsProvider } from "@/app/contexts";
import {
	LanguageDropdown,
	TranslationsDropdownServerComponent,
} from "@/app/components";

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

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SelectionsProvider>
					<div className="flex flex-col items-center gap-4 pb-4" id="top">
						<nav>
							<Link href="/">Home</Link>
						</nav>
						<div className="w-full max-w-[350px] mx-auto px-4 flex flex-col gap-4">
							<LanguageDropdown />
							<TranslationsDropdownServerComponent />
						</div>
					</div>
					{children}
				</SelectionsProvider>
				<GoogleAnalytics gaId="G-GFXVNJNTHD" />
			</body>
		</html>
	);
}
