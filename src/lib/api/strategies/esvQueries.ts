import { Reading } from "@/app/interfaces";
import { bookNames, chapterCounts } from "@/app/constants";
import { getReadingTitle } from "@/app/utils/helpers";

// The ESV API treats a bare book name as chapter 1 and caps a single request
// at half a book, so anything wider than one chapter is split into one query
// per chapter. Verse ranges are already a single chapter and pass through.
export const getEsvQueries = (reading: Reading): string[] => {
	const { bookId, chapters, verses } = reading;

	if (verses) {
		return [getReadingTitle(reading)];
	}

	const first = chapters?.first ?? 1;
	const last = chapters?.last ?? chapterCounts[bookId];
	const bookName = bookNames[bookId];

	const queries: string[] = [];
	for (let chapter = first; chapter <= last; chapter++) {
		queries.push(`${bookName} ${chapter}`);
	}
	return queries;
};
