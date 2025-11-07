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
					<nav>
						<Link href="/">Home</Link>
					</nav>
					<div>
						<LanguageDropdown />
					</div>
					<div>
						<TranslationsDropdownServerComponent />
					</div>
					{children}
				</SelectionsProvider>
			</body>
		</html>
	);
}
