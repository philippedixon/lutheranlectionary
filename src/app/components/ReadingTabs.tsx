import React from "react";
import { Reading } from "@/app/interfaces";
import { getReadingTitle } from "@/app/utils";

interface ReadingTabsProps {
	readings: Reading[];
	activeIndex: number;
	onSelect: (index: number) => void;
}

export const ReadingTabs: React.FC<ReadingTabsProps> = ({
	readings,
	activeIndex,
	onSelect,
}) => {
	return (
		<div className="flex flex-wrap justify-center gap-4 mb-7">
			{readings.map((reading, index) => {
				const isActive = index === activeIndex;
				return (
					<button
						key={getReadingTitle(reading)}
						type="button"
						onClick={() => onSelect(index)}
						className="flex flex-col items-center gap-[7px]"
					>
						<span
							data-testid={`reading-tab-label-${index}`}
							className={`font-eb-garamond italic app-text-tab ${
								isActive ? "font-semibold text-primary" : "text-gold"
							}`}
						>
							{getReadingTitle(reading)}
						</span>
						<span
							data-testid={`reading-tab-underline-${index}`}
							className={`h-[2px] w-full ${
								isActive ? "bg-primary" : "bg-transparent"
							}`}
						/>
					</button>
				);
			})}
		</div>
	);
};
