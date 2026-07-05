import React from "react";
import { Reading } from "@/app/interfaces";
import { getReadingTitle } from "@/app/utils";

interface EsvPassageProps {
	html: string;
	readingInformation: Reading;
}

export const EsvPassage: React.FC<EsvPassageProps> = ({
	html,
	readingInformation,
}) => {
	const title = getReadingTitle(readingInformation);

	return (
		<div>
			<h3 className="font-eb-garamond italic text-[17px] text-gold text-center mb-2">{title}</h3>
			<div
				className="esv-passage"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
};
