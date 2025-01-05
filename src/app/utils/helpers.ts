import { bookNames } from "@/app/constants";
import {
	ChapterContent,
	ChapterVerse,
	Reading,
	TranslationBookChapter,
} from "@/app/interfaces";
import { BookId } from "@/app/enums";

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

	let display = bookNames[book.id] as string;
	if (chapters) {
		display = `${display} ${chapters}`;
	}

	if (verses) {
		display = `${display}:${verses}`;
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

	const [firstChapter, lastChapter] = reading?.chapters?.split("-") ?? [];
	const firstChapterNumber = parseInt(firstChapter);
	let lastChapterNumber = parseInt(lastChapter);

	if (!lastChapterNumber) {
		lastChapterNumber = firstChapterNumber;
	}

	try {
		const chapters: TranslationBookChapter[] = [];
		for (
			let chapterNumber = firstChapterNumber;
			chapterNumber < lastChapterNumber + 1;
			chapterNumber++
		) {
			const chapter = await fetchChapter(
				translationId,
				reading.book.id,
				chapterNumber
			);
			chapters.push(chapter);
		}

		return chapters;
	} catch (error) {
		const bookName = bookNames[reading.book.id];
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

	const bookId = reading.book.id;
	let nextChapterApiLink:
		| string
		| null = `/api/${translationId}/${bookId}/1.json`;
	const chapters = [];

	try {
		while (nextChapterApiLink) {
			const response = await fetch(
				`https://bible.helloao.org${nextChapterApiLink}`
			);
			const chapter: TranslationBookChapter = await response.json();
			chapters.push(chapter);
			nextChapterApiLink = chapter.nextChapterApiLink;
		}
	} catch (error) {
		const bookName = bookNames[reading.book.id];
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

export const fetchChapters = async (
	translationId: string,
	reading: Reading
): Promise<TranslationBookChapter[]> => {
	if (!translationId) {
		return [];
	}

	if (!reading?.chapters) {
		return fetchBook(translationId, reading);
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
			const bookName = bookNames[reading.book.id];
			console.error(`Error fetching ${bookName} ${i}:`, error);
		}
	}

	return chapters;
};
