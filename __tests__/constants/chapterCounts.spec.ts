import { chapterCounts } from "@/app/constants";
import { BookId } from "@/app/enums";

describe("chapterCounts", () => {
	it("has an entry for every BookId", () => {
		for (const bookId of Object.values(BookId)) {
			expect(chapterCounts).toHaveProperty(bookId);
		}
	});

	it("has a positive integer for every book", () => {
		for (const count of Object.values(chapterCounts)) {
			expect(Number.isInteger(count)).toBe(true);
			expect(count).toBeGreaterThan(0);
		}
	});

	it.each([
		[BookId.Genesis, 50],
		[BookId.Psalms, 150],
		[BookId.Obadiah, 1],
		[BookId.Joel, 3],
		[BookId.Revelation, 22],
	])("%s has %i chapters", (bookId, expected) => {
		expect(chapterCounts[bookId]).toBe(expected);
	});
});
