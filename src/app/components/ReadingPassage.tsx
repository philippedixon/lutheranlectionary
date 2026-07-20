import React from "react";
import { PassageUnavailable, Verse } from "@/app/components";
import { ChapterVerse, TranslationBookChapter } from "@/app/interfaces";
import { isPoetryPassage } from "@/app/utils";

interface ReadingPassageProps {
	passageChapters: TranslationBookChapter[];
}

export const ReadingPassage: React.FC<ReadingPassageProps> = ({
	passageChapters,
}) => {
	// A failed fetch can leave a chapter without data; skip it rather than crash.
	const chaptersWithData = passageChapters.filter(
		(bookChapter) => bookChapter.book && bookChapter.chapter?.content
	);
	const hasPoetry = chaptersWithData.some((bookChapter) =>
		isPoetryPassage(bookChapter.chapter.content)
	);

	return (
		<div className={hasPoetry ? "poetry-passage" : undefined}>
			{chaptersWithData.length === 0 && <PassageUnavailable />}
			{chaptersWithData.map((bookChapter) => (
				<div key={`${bookChapter.book.id}:${bookChapter.chapter.number}`}>
					{bookChapter.chapter.content.map((line, index) => {
						let node;
						const baseKey = `${bookChapter.book.id}:${bookChapter.chapter.number}:${index}`;
						if (line.type === "heading") {
							node = (
								<h4 key={`${baseKey}-heading`} className="font-cormorant font-semibold text-primary text-center text-[24px] pt-3">
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
