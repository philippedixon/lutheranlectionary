"use client";

import Image from "next/image";

export const ScrollToTopButton = () => {
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
			className="fixed bottom-6 right-6 p-2"
		>
			<Image
				src="/thin-chevron-round-top-icon.svg"
				alt="Scroll to top"
				width={24}
				height={24}
			/>
		</button>
	);
};
