"use client";

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
			className="flex flex-col items-center gap-[3px] text-primary"
		>
			<svg
				data-testid="scroll-to-top-icon"
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M5 15l7-7 7 7" />
			</svg>
			<div className="w-[22px] h-px bg-current" />
		</button>
	);
};
