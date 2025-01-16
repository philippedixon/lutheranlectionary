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
				const testId = `${bookChapterNumber}:${line.number}-${verseLineIndex}`;
				const displayVerseNumber = verseLineIndex === 0;

				let verse: JSX.Element | null = null;
				if (typeof verseLine === "string") {
					verse = (
						<span data-testid={testId} key={verseKey}>
							<sup>{displayVerseNumber && `${line.number} `}</sup>
							{verseLine}&nbsp;
						</span>
					);
				} else if ((verseLine as InlineLineBreak)?.lineBreak) {
					verse = <p key={verseKey}></p>;
				} else if ((verseLine as FormattedText)?.poem) {
					const formattedText = verseLine as FormattedText;
					const tab = "\t";
					const indent = tab.repeat(formattedText.poem ?? 0);
					verse = (
						<pre data-testid={testId} key={`poem:${formattedText.text}`}>
							{indent}
							<sup>{displayVerseNumber && `${line.number} `}</sup>
							{formattedText.text}
						</pre>
					);
				} else if ((verseLine as InlineHeading)?.heading) {
					verse = (
						<h4 className="font-bold" data-testid={testId} key={verseKey}>
							{(verseLine as InlineHeading).heading}
						</h4>
					);
				}

				if (verse && (verseLine as FormattedText)?.wordsOfJesus) {
					verse = React.cloneElement(verse, {
						className: `${verse.props.className || ""} text-red-500`,
					});
				}

				return verse;
			})}
		</span>
	);
};
