import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";
import { Cormorant_Garamond, EB_Garamond, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SelectionsProvider, ThemeProvider } from "@/app/contexts";
import { AppHeaderServer } from "@/app/components";

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

const sourceSerif = Source_Serif_4({
	subsets: ["latin"],
	weight: ["400", "600"],
	style: ["normal", "italic"],
	variable: "--font-source-serif",
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
				className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${ebGaramond.variable} ${sourceSerif.variable} antialiased`}
			>
				<ThemeProvider>
				<SelectionsProvider>
					<div id="top">
						<AppHeaderServer />
					</div>
					{children}
				</SelectionsProvider>
				</ThemeProvider>
				<GoogleAnalytics gaId="G-GFXVNJNTHD" />
			</body>
		</html>
	);
}
