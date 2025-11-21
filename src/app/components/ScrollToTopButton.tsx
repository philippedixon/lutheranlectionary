"use client";

import Image from "next/image";

export const ScrollToTopButton = () => {
	return (
		<button
			type="button"
			aria-label="Scroll to top"
			onClick={() =>
				document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
			}
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
