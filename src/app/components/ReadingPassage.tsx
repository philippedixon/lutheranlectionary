import React from "react";
import { TranslationBookChapter } from "@/app/interfaces";

interface ReadingPassageProps {
	passage: TranslationBookChapter[];
	title: string;
}

export const ReadingPassage: React.FC<ReadingPassageProps> = ({
	passage,
	title,
}) => {
	return (
		<div>
			<h3>{title}</h3>
			{passage.map((translationBookChapter, index) => (
				<div key={index}></div>
			))}
		</div>
	);
};
