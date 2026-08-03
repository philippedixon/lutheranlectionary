import React, { useContext } from "react";
import { SelectionsContext } from "@/app/contexts";

interface EsvPassageProps {
	html: string;
}

export const EsvPassage: React.FC<EsvPassageProps> = ({ html }) => {
	const selections = useContext(SelectionsContext);
	const fontClass = selections.bodyFont === "serif4" ? "font-serif4" : "";
	const sizeClass =
		selections.fontSize === "small"
			? "size-small"
			: selections.fontSize === "large"
				? "size-large"
				: "";

	return (
		<div>
			<div
				className={`esv-passage ${fontClass} ${sizeClass}`.trim()}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
};
