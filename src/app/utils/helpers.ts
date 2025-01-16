import { bookNames } from "@/app/constants";
import {
	ChapterContent,
	ChapterVerse,
	Reading,
	TranslationBookChapter,
} from "@/app/interfaces";
import { BookId } from "@/app/enums";

export const getReadingTitle = (reading: Reading) => {
	const { bookId, chapters, verses } = reading;

	let display = bookNames[bookId] as string;
	if (chapters) {
		const chapterRange =
			chapters.first === chapters.last
				? chapters.first
				: `${chapters.first}-${chapters.last}`;
		display = `${display} ${chapterRange}`;
	}

	if (verses) {
		const verseRange =
			verses.first === verses.last
				? verses.first
				: `${verses.first}-${verses.last}`;
		display = `${display}:${verseRange}`;
	}

	return display;
};

export const fetchReading = async (
	translationId: string | undefined,
	reading: Reading
): Promise<TranslationBookChapter[]> => {
	if (!translationId) {
		return [];
	}

	if (!reading?.chapters) {
		return fetchBook(translationId, reading);
	}

	const { first: firstChapterNumber, last: lastChapterNumber } =
		reading.chapters;

	try {
		const chapters: TranslationBookChapter[] = [];
		for (
			let chapterNumber = firstChapterNumber;
			chapterNumber < lastChapterNumber + 1;
			chapterNumber++
		) {
			const chapter = await fetchChapter(
				translationId,
				reading.bookId,
				chapterNumber
			);
			chapters.push(chapter);
		}

		return chapters;
	} catch (error) {
		const bookName = bookNames[reading.bookId];
		console.error(`Error fetching chapters for ${bookName}:`, error);
		return [];
	}
};

export const fetchBook = async (
	translationId: string | undefined,
	reading: Reading
): Promise<TranslationBookChapter[]> => {
	if (!translationId) {
		return [];
	}

	const bookId = reading.bookId;
	let nextChapterApiLink:
		| string
		| null = `/api/${translationId}/${bookId}/1.json`;
	const chapters = [];

	try {
		while (nextChapterApiLink?.includes(bookId)) {
			const response = await fetch(
				`https://bible.helloao.org${nextChapterApiLink}`
			);
			const chapter: TranslationBookChapter = await response.json();
			chapters.push(chapter);
			nextChapterApiLink = chapter.nextChapterApiLink;
		}
	} catch (error) {
		const bookName = bookNames[reading.bookId];
		console.error(`Error fetching ${bookName}:`, error);
	}

	return chapters;
};

export const fetchChapter = async (
	translationId: string,
	bookId: BookId,
	chapterNumber: number
): Promise<TranslationBookChapter> => {
	let chapter: TranslationBookChapter = {} as TranslationBookChapter;
	try {
		const data = await fetch(
			`https://bible.helloao.org/api/${translationId}/${bookId}/${chapterNumber}.json`
		);
		chapter = await data.json();
	} catch (error) {
		console.error(
			`Error fetching ${bookId}:${chapterNumber} for ${translationId}:`,
			error
		);
	}

	return chapter;
};

export const parseChapter = (
	chapter: TranslationBookChapter,
	firstVerse: number,
	lastVerse: number
): ChapterContent[] => {
	const chapterContent = chapter.chapter.content;

	// Find the index of the first verse
	const firstVerseIndex = chapterContent.findIndex(
		(content) =>
			content.type === "verse" &&
			(content as ChapterVerse).number === firstVerse
	);

	// Find the index of the last verse
	const lastVerseIndex = chapterContent.findIndex(
		(content) =>
			content.type === "verse" && (content as ChapterVerse).number === lastVerse
	);

	// Return a slice from the first verse to the last verse + 1
	return chapterContent.slice(firstVerseIndex, lastVerseIndex + 1);
};
