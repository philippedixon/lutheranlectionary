"use client";

import Image from "next/image";
import { useTheme } from "@/app/contexts";

export const ScrollToTopButton = () => {
	const { theme } = useTheme();

	const handleClick = () => {
		const element = document.getElementById("top");
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
			history.replaceState(null, "", `#top`);
		}
	};

	return (
		<button
			type="button"
			aria-label="Scroll to top"
			onClick={handleClick}
			className="sticky bottom-6 ml-auto block p-2"
		>
			<Image
				src={theme === "dark" ? "/thin-chevron-round-top-icon-light.svg" : "/thin-chevron-round-top-icon.svg"}
				alt="Scroll to top"
				width={24}
				height={24}
			/>
		</button>
	);
};
