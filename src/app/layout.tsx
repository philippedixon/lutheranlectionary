"use client";

import localFont from "next/font/local";
import "./globals.css";
import { SelectionsProvider } from "@/app/contexts";
import { TranslationsProvider } from "@/app/contexts";

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

export default function RootLayout({
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
				<TranslationsProvider>
					<SelectionsProvider>{children}</SelectionsProvider>
				</TranslationsProvider>
			</body>
		</html>
	);
}
