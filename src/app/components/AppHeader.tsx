"use client";

import { useState } from "react";
import Link from "next/link";
import { Translation } from "@/app/interfaces";
import { DarkModeToggle } from "./DarkModeToggle";
import { OptionsPanel } from "./OptionsPanel";

interface AppHeaderProps {
	translations: Translation[];
}

export const AppHeader: React.FC<AppHeaderProps> = ({ translations }) => {
	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<>
			<header className="flex items-center justify-between w-full max-w-[960px] mx-auto px-8 pt-6">
				<div className="flex items-center gap-5">
					<Link href="/" aria-label="Home">
						<svg
							data-testid="home-icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							fill="none"
							stroke="currentColor"
							strokeWidth={1.4}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-primary"
						>
							<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
							<polyline points="9 21 9 12 15 12 15 21" />
						</svg>
					</Link>
					<button
						aria-label="Reading options"
						onClick={() => setPanelOpen(true)}
					>
						<svg
							data-testid="options-icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							fill="none"
							stroke="currentColor"
							strokeWidth={1.4}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-primary"
						>
							<line x1="4" y1="6" x2="20" y2="6" />
							<circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
							<line x1="4" y1="12" x2="20" y2="12" />
							<circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
							<line x1="4" y1="18" x2="20" y2="18" />
							<circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
						</svg>
					</button>
				</div>
				<DarkModeToggle />
			</header>
			<OptionsPanel
				isOpen={panelOpen}
				onClose={() => setPanelOpen(false)}
				translations={translations}
			/>
		</>
	);
};
