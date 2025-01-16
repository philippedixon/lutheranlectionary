import React from "react";
import { Verse } from "@/app/components";
import {
	ChapterVerse,
	Reading,
	TranslationBookChapter,
} from "@/app/interfaces";
import { getReadingTitle } from "@/app/utils";

interface ReadingPassageProps {
	passageChapters: TranslationBookChapter[];
	readingInformation: Reading;
}

export const ReadingPassage: React.FC<ReadingPassageProps> = ({
	passageChapters,
	readingInformation,
}) => {
	const title = getReadingTitle(readingInformation);

	return (
		<div>
			<h3>{title}</h3>
			{passageChapters.map((bookChapter) => (
				<div key={`${bookChapter.book.id}:${bookChapter.chapter.number}`}>
					{bookChapter.chapter.content.map((line) => {
						let node;
						if (line.type === "heading") {
							node = (
								<h4>
									{line.content
										.filter((text) => typeof text === "string")
										.join(" ")}
								</h4>
							);
						} else if (line.type === "verse") {
							node = (
								<Verse
									key={line.number}
									line={line as ChapterVerse}
									bookChapterNumber={bookChapter.chapter.number}
								/>
							);
						} else if (line.type === "line_break") {
							node = <br />;
						}

						return node;
					})}
				</div>
			))}
		</div>
	);
};
