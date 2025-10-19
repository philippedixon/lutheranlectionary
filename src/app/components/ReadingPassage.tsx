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
			<h3 data-testid="title">{title}</h3>
			{passageChapters.map((bookChapter) => (
				<div key={`${bookChapter.book.id}:${bookChapter.chapter.number}`}>
					{bookChapter.chapter.content.map((line, index) => {
						let node;
						const baseKey = `${bookChapter.book.id}:${bookChapter.chapter.number}:${index}`;
						if (line.type === "heading") {
							node = (
								<h4 key={`${baseKey}-heading`} className="font-bold">
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
							node = <br key={`${baseKey}:break`} />;
						}

						return node;
					})}
				</div>
			))}
		</div>
	);
};
