import React from "react";

interface EsvPassageProps {
	html: string;
}

export const EsvPassage: React.FC<EsvPassageProps> = ({ html }) => {
	return (
		<div>
			<div
				className="esv-passage"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
};
