import React from "react";
import { Verse } from "@/app/components";
import {
	ChapterVerse,
	Reading,
	TranslationBookChapter,
} from "@/app/interfaces";
import { getReadingTitle, isPoetryPassage } from "@/app/utils";

interface ReadingPassageProps {
	passageChapters: TranslationBookChapter[];
	readingInformation: Reading;
}

export const ReadingPassage: React.FC<ReadingPassageProps> = ({
	passageChapters,
	readingInformation,
}) => {
	const title = getReadingTitle(readingInformation);
	const hasPoetry = passageChapters.some((bookChapter) =>
		isPoetryPassage(bookChapter.chapter.content)
	);

	return (
		<div className={hasPoetry ? "poetry-passage" : undefined}>
			<h3 data-testid="title" className="font-eb-garamond italic text-[17px] text-gold text-center mb-2">{title}</h3>
			{passageChapters.map((bookChapter) => (
				<div key={`${bookChapter.book.id}:${bookChapter.chapter.number}`}>
					{bookChapter.chapter.content.map((line, index) => {
						let node;
						const baseKey = `${bookChapter.book.id}:${bookChapter.chapter.number}:${index}`;
						if (line.type === "heading") {
							node = (
								<h4 key={`${baseKey}-heading`} className="font-cormorant font-semibold text-primary pt-3">
									{line.content
										.filter((text) => typeof text === "string")
										.join(" ")}
								</h4>
							);
						} else if (line.type === "verse") {
							node = (
								<Verse
									bookChapterNumber={bookChapter.chapter.number}
									key={`${baseKey}:${line.number}`}
									line={line as ChapterVerse}
								/>
							);
						} else if (line.type === "line_break") {
							const topMargin =
								index !== 0 &&
								bookChapter.chapter.content[index - 1]?.type === "heading"
									? "mt-3"
									: "mt-5";
							node = <p className={`${topMargin}`} key={`${baseKey}:break`} />;
						}

						return node;
					})}
				</div>
			))}
		</div>
	);
};
