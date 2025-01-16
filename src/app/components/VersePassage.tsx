import {
	ChapterVerse,
	Reading,
	TranslationBookChapter,
	Verses,
} from "@/app/interfaces";
import { getReadingTitle } from "@/app/utils";
import { Verse } from "./Verse";

interface VersePassageProps {
	passageChapter: TranslationBookChapter;
	readingInformation: Reading;
}

export const VersePassage: React.FC<VersePassageProps> = ({
	passageChapter,
	readingInformation,
}) => {
	const title = getReadingTitle(readingInformation);

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

	return (
		<div>
			<h3>{title}</h3>
			{verseContents?.map((line) => {
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
							bookChapterNumber={passageChapter.chapter.number}
						/>
					);
				} else if (line.type === "line_break") {
					node = <br />;
				}

				return node;
			})}
		</div>
	);
};
