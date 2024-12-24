import { Reading } from "@/app/interfaces";
import {
	ChapterContent,
	ChapterVerse,
	TranslationBookChapter,
} from "@/app/interfaces";

export const getReadingContent = (
	reading: Reading,
	chapters: TranslationBookChapter[]
): ChapterContent[] => {
	if (!chapters?.length) {
		return [];
	}
	// adjust to account for multiple books
	// adjust to get all chapters if no chapters in reading
	const { verses } = reading;

	let content: ChapterContent[] = [];
	if (verses) {
		const [startVerseString, endVerseString] = verses.split("-");
		const startVerse = parseInt(startVerseString);
		const endVerse = endVerseString ? parseInt(endVerseString) : startVerse;

		content = chapters[0].chapter.content.filter((chapterContent) => {
			const verseNumber = (chapterContent as ChapterVerse)?.number;
			const isVerseInRange =
				startVerse <= verseNumber && verseNumber <= endVerse;
			return chapterContent.type === "line_break" || isVerseInRange;
		});

		const firstVerse =
			content.findIndex((content) => content.type === "verse") || 0;
		const lastVerse =
			content.findLastIndex((content) => content.type === "verse") || 0;
		content = content.slice(firstVerse, lastVerse + 1);
	} else {
		content = chapters.map((chapter) => chapter.chapter.content).flat();
	}

	return content;
};

export const getReadingTitle = (reading: Reading) => {
	const { book, chapters, verses } = reading;
	let display = book.name as string;
	display = chapters ? `${display} ${chapters}` : display;
	display = verses ? `${display}:${verses}` : display;

	return display;
};

export const fetchBook = async () => {};

export const fetchChapters = async (
	translationId: string,
	reading: Reading
): Promise<TranslationBookChapter[]> => {
	if (!translationId) {
		return [];
	}

	// eslint-disable-next-line prefer-const
	let [firstChapter, lastChapter] = reading?.chapters?.split("-") ?? [];

	if (!lastChapter) {
		lastChapter = firstChapter;
	}

	const chapters = [];
	for (let i = parseInt(firstChapter); i <= parseInt(lastChapter); i++) {
		try {
			const response = await fetch(
				`https://bible.helloao.org/api/${translationId}/${reading.book.id}/${i}.json`
			);
			const data = await response.json();
			chapters.push(data);
		} catch (error) {
			console.error(`Error fetching ${reading.book.name} ${i}:`, error);
		}
	}

	return chapters;
};
