import React from "react";
import {
	FormattedText,
	InlineHeading,
	InlineLineBreak,
	ChapterVerse,
} from "@/app/interfaces";

interface VerseProps {
	line: ChapterVerse;
	bookChapterNumber: number;
}

export const Verse: React.FC<VerseProps> = ({ line, bookChapterNumber }) => {
	return (
		<span>
			{line.number === 1 ? (
				<span className="text-2xl font-bold">
					{`${bookChapterNumber}`}&nbsp;
				</span>
			) : null}
			{line.content.map((verseLine, verseLineIndex) => {
				const verseKey = `${line.number}:${verseLineIndex}`;
				const displayVerseNumber = verseLineIndex === 0;
				let verse;
				if (typeof verseLine === "string") {
					verse = (
						<span key={verseKey}>
							<sup>{displayVerseNumber && `${line.number} `}</sup>
							{verseLine}&nbsp;
						</span>
					);
				} else if ((verseLine as InlineLineBreak)?.lineBreak) {
					verse = <p key={verseKey}></p>;
				} else if (
					(verseLine as FormattedText)?.poem ||
					(verseLine as FormattedText)?.wordsOfJesus
				) {
					const formattedText = verseLine as FormattedText;
					const tab = "\t";
					const indent = tab.repeat(formattedText.poem ?? 0);
					const wordsOfJesusClass = formattedText.wordsOfJesus
						? "text-red-500"
						: "";
					verse = (
						<pre
							className={wordsOfJesusClass}
							key={`poem:${formattedText.text}`}
						>
							{indent}
							<sup>{displayVerseNumber && `${line.number} `}</sup>
							{formattedText.text}
						</pre>
					);
					if (formattedText.wordsOfJesus) {
						verse = (
							<span
								className={`${wordsOfJesusClass}`}
								key={`wordOfJesus${formattedText.text}`}
							>
								<span>{verse}</span>
							</span>
						);
					}
				} else if ((verseLine as InlineHeading)?.heading) {
					verse = (
						<h4 className="font-bold">
							{(verseLine as InlineHeading).heading}
						</h4>
					);
				}

				return verse;
			})}
		</span>
	);
};
