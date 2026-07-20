import {
	ChapterVerse,
	Reading,
	TranslationBookChapter,
	Verses,
} from "@/app/interfaces";
import { isPoetryPassage } from "@/app/utils";
import { PassageUnavailable } from "./PassageUnavailable";
import { Verse } from "./Verse";

interface VersePassageProps {
	passageChapter: TranslationBookChapter;
	readingInformation: Reading;
}

export const VersePassage: React.FC<VersePassageProps> = ({
	passageChapter,
	readingInformation,
}) => {
	const { first: firstVerse, last: lastVerse } =
		readingInformation.verses as Verses;

	const firstVerseIndex = passageChapter?.chapter?.content.findIndex(
		(line) => line.type === "verse" && line.number === firstVerse
	);
	const lastVerseIndex = passageChapter?.chapter?.content.findIndex(
		(line) => line.type === "verse" && line.number === lastVerse
	);
	const verseContents = passageChapter?.chapter?.content.slice(
		firstVerseIndex,
		lastVerseIndex + 1
	);
	const hasPoetry = isPoetryPassage(verseContents ?? []);

	return (
		<div className={hasPoetry ? "poetry-passage" : undefined}>
			{!verseContents?.length && <PassageUnavailable />}
			{verseContents?.map((line, index) => {
				let node;
				const baseKey = `${passageChapter.book.id}:${passageChapter.chapter.number}:${index}`;
				if (line.type === "heading") {
					node = (
						<h4 key={`${baseKey}:heading`} className="font-cormorant font-semibold text-primary text-center text-[24px]">
							{line.content
								.filter((text) => typeof text === "string")
								.join(" ")}
						</h4>
					);
				} else if (line.type === "verse") {
					node = (
						<Verse
							bookChapterNumber={passageChapter.chapter.number}
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
	);
};
