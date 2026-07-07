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
						className={`font-eb-garamond italic text-[16.5px] ${
							isActive
								? "text-primary border-b-[1.5px] border-gold"
								: "text-gold"
						}`}
					>
						{getReadingTitle(reading)}
					</button>
				);
			})}
		</div>
	);
};
