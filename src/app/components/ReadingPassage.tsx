import React, { useContext } from "react";
import { PassageUnavailable, Verse } from "@/app/components";
import {
	ChapterHebrewSubtitle,
	ChapterVerse,
	TranslationBookChapter,
} from "@/app/interfaces";
import { SelectionsContext } from "@/app/contexts";
import { fontSizeClass, headingSizeClass, isPoetryPassage } from "@/app/utils";

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
	const selections = useContext(SelectionsContext);

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
								<h4 key={`${baseKey}-heading`} className={`font-cormorant font-semibold text-primary text-center ${headingSizeClass(selections.fontSize)} max-w-[480px] mx-auto pt-3`}>
									{line.content
										.filter((text) => typeof text === "string")
										.join(" ")}
								</h4>
							);
						} else if (line.type === "hebrew_subtitle") {
							node = (
								<p
									key={`${baseKey}-subtitle`}
									className={`font-eb-garamond italic text-gold text-center ${fontSizeClass(selections.fontSize)} max-w-[480px] mx-auto mb-[30px]`}
								>
									{(line as ChapterHebrewSubtitle).content
										.filter((text) => typeof text === "string")
										.join(" ")}
								</p>
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
