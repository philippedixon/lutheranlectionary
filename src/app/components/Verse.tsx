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
						<p data-testid={testId} key={verseKey} className="font-eb-garamond text-[19px] leading-[1.75] text-body-text">
							{line.number === 1 && verseLineIndex == 0 ? (
								<span className="font-cormorant font-semibold not-italic text-[24px] text-primary">
									{`${bookChapterNumber}`}&nbsp;
								</span>
							) : (
								<sup className="font-eb-garamond font-semibold not-italic text-[13px] text-gold mr-1">{displayVerseNumber && `${line.number}`}</sup>
							)}
							{verseLine}
						</p>
					);
				} else if ((verseLine as InlineLineBreak)?.lineBreak) {
					verse = <p key={verseKey}></p>;
				} else if ((verseLine as FormattedText)?.poem) {
					const formattedText = verseLine as FormattedText;
					verse = (
						<p
							className="pl-4 font-eb-garamond italic text-[19px] leading-[1.75] text-body-text"
							data-testid={testId}
							key={`poem:${formattedText.text}:${verseLineIndex}`}
						>
							<sup className="font-eb-garamond font-semibold not-italic text-[13px] text-gold mr-1">{displayVerseNumber && `${line.number}`}</sup>
							{formattedText.text}
						</p>
					);
				} else if ((verseLine as InlineHeading)?.heading) {
					verse = (
						<h4 className="font-cormorant font-semibold text-primary" data-testid={testId} key={verseKey}>
							{(verseLine as InlineHeading).heading}
						</h4>
					);
				} else if ((verseLine as FormattedText)?.wordsOfJesus) {
					verse = (
						<p className="font-eb-garamond text-[19px] leading-[1.75] text-red-500" data-testid={testId} key={verseKey}>
							{line.number === 1 ? (
								<span className="font-cormorant font-semibold not-italic text-[24px] text-primary">
									{`${bookChapterNumber}`}&nbsp;
								</span>
							) : (
								<sup className="font-eb-garamond font-semibold not-italic text-[13px] text-gold mr-1">{displayVerseNumber && `${line.number}`}</sup>
							)}
							{(verseLine as FormattedText).text}
						</p>
					);
				}

				return verse;
			})}
		</div>
	);
};
