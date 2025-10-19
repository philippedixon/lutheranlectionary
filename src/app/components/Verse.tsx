import React from "react";
import {
	FormattedText,
	InlineHeading,
	InlineLineBreak,
	ChapterVerse,
} from "@/app/interfaces";

interface VerseProps {
	bookChapterNumber: number;
	line: ChapterVerse;
}

export const Verse: React.FC<VerseProps> = ({ line, bookChapterNumber }) => {
	return (
		<div>
			{line.content.map((verseLine, verseLineIndex) => {
				const verseKey = `${line.number}:${verseLineIndex}`;
				const testId = `${bookChapterNumber}:${line.number}-${verseLineIndex}`;
				const displayVerseNumber = verseLineIndex === 0;

				let verse: JSX.Element | null = null;
				if (typeof verseLine === "string") {
					verse = (
						<p data-testid={testId} key={verseKey}>
							{line.number === 1 ? (
								<span className="text-2xl font-bold">
									{`${bookChapterNumber}`}&nbsp;
								</span>
							) : (
								<sup>{displayVerseNumber && `${line.number} `}</sup>
							)}
							{verseLine}
						</p>
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
				} else if ((verseLine as FormattedText)?.wordsOfJesus) {
					verse = (
						<p className="text-red-500" data-testid={testId} key={verseKey}>
							{line.number === 1 ? (
								<span className="text-2xl font-bold">
									{`${bookChapterNumber}`}&nbsp;
								</span>
							) : (
								<sup>{displayVerseNumber && `${line.number} `}</sup>
							)}
							{(verseLine as FormattedText).text}
						</p>
					);

					// verse = React.cloneElement(verse, {
					// 	className: `${verse.props.className || ""} text-red-500`,
					// });
				}

				return verse;
			})}
		</div>
	);
};
