import React from "react";

interface PassageUnavailableProps {
	onRetry?: () => void;
}

const messageClass =
	"font-eb-garamond italic text-[17px] text-gold text-center mt-4";

export const PassageUnavailable: React.FC<PassageUnavailableProps> = ({
	onRetry,
}) => {
	if (!onRetry) {
		return (
			<p className={messageClass}>
				Passage not available in this translation.
			</p>
		);
	}

	return (
		<div className="flex flex-col items-center gap-3">
			<p className={messageClass}>Couldn&apos;t load this passage.</p>
			<button
				type="button"
				onClick={onRetry}
				className="font-eb-garamond italic text-[17px] text-gold underline"
			>
				Try again
			</button>
		</div>
	);
};
