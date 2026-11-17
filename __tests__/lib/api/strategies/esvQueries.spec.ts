import { getEsvQueries } from "@/lib/api/strategies/esvQueries";
import { BookId } from "@/app/enums";
import type { Reading } from "@/app/interfaces";

describe("getEsvQueries", () => {
	it("expands a whole-book reading into one query per chapter", () => {
		const reading: Reading = { bookId: BookId.Joel };
		expect(getEsvQueries(reading)).toEqual(["Joel 1", "Joel 2", "Joel 3"]);
	});

	// "Philemon 1" means verse 1 to the ESV API, so a one-chapter book is
	// requested by bare name, which returns the whole book.
	it("uses the bare book name for a single-chapter book", () => {
		const reading: Reading = { bookId: BookId.Obadiah };
		expect(getEsvQueries(reading)).toEqual(["Obadiah"]);
	});

	it("uses the bare book name for a single-chapter book given as chapter 1", () => {
		const reading: Reading = {
			bookId: BookId.Philemon,
			chapters: { first: 1, last: 1 },
		};
		expect(getEsvQueries(reading)).toEqual(["Philemon"]);
	});

	it("expands a chapter range into one query per chapter", () => {
		const reading: Reading = {
			bookId: BookId.Amos,
			chapters: { first: 1, last: 5 },
		};
		expect(getEsvQueries(reading)).toEqual([
			"Amos 1",
			"Amos 2",
			"Amos 3",
			"Amos 4",
			"Amos 5",
		]);
	});

	it("returns a single query for a single chapter", () => {
		const reading: Reading = {
			bookId: BookId.John,
			chapters: { first: 1, last: 1 },
		};
		expect(getEsvQueries(reading)).toEqual(["John 1"]);
	});

	it("never splits a verse-range reading", () => {
		const reading: Reading = {
			bookId: BookId.John,
			chapters: { first: 11, last: 11 },
			verses: { first: 35, last: 36 },
		};
		expect(getEsvQueries(reading)).toEqual(["John 11:35-36"]);
	});
});
