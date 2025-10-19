import { BookId } from "@/app/enums";
import {
	fetchChapter,
	fetchBook,
	fetchReading,
	parseChapter,
} from "@/app/utils";
import { ChapterVerse, Reading } from "@/app/interfaces";
import { lukeTranslationBookChapter } from "../../__mocks__/content";

describe("fetchReading", () => {
	afterEach(() => jest.clearAllMocks());

	it("should return an empty array if no translationId is provided", async () => {
		const result = await fetchReading(undefined, {
			bookId: BookId.Genesis,
		});

		expect(result).toEqual([]);
	});

	it.todo("should fetch the entire book if no chapters are provided");

	it.todo("should fetch the specified chapters if chapters are provided");

	it.todo("should handle errors gracefully");
});

describe("fetchChapter", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should make a call to the chapter API endpoint", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({}),
			})
		) as jest.Mock;

		await fetchChapter("BSB", BookId.Revelation, 1);

		expect(global.fetch).toHaveBeenCalledWith(
			"https://bible.helloao.org/api/BSB/REV/1.json"
		);
	});
});

describe("fetchBook", () => {
	const reading: Reading = {
		bookId: BookId.Philemon,
	};

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should return an empty array if no translationId is provided", async () => {
		const result = await fetchBook(undefined, reading);

		expect(result).toEqual([]);
	});

	it("should fetch all chapters of a book", async () => {
		global.fetch = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({
					json: () =>
						Promise.resolve({
							nextChapterApiLink: "/api/BSB/PHM/2.json",
						}),
				})
			)
			.mockImplementationOnce(() =>
				Promise.resolve({
					json: () =>
						Promise.resolve({
							nextChapterApiLink: null,
						}),
				})
			);

		const result = await fetchBook("BSB", reading);

		expect(global.fetch).toHaveBeenCalledTimes(2);
		expect(global.fetch).toHaveBeenNthCalledWith(
			1,
			"https://bible.helloao.org/api/BSB/PHM/1.json"
		);
		expect(global.fetch).toHaveBeenNthCalledWith(
			2,
			"https://bible.helloao.org/api/BSB/PHM/2.json"
		);
		expect(result.length).toBe(2);
	});

	it("should handle errors gracefully", async () => {
		global.fetch = jest.fn(() => Promise.reject("Error")) as jest.Mock;

		const result = await fetchBook("BSB", reading);

		expect(result).toEqual([]);
	});
});

describe("parseChapter", () => {
	it("should only return content between the start and end verse", () => {
		const chapter = lukeTranslationBookChapter;
		const firstVerseNumber = 68;
		const lastVerseNumber = 79;

		const content = parseChapter(chapter, firstVerseNumber, lastVerseNumber);

		const firstVerse = content[0] as ChapterVerse;
		const lastVerse = content[content.length - 1] as ChapterVerse;

		expect(firstVerse.number).toEqual(firstVerseNumber);
		expect(lastVerse.number).toEqual(lastVerseNumber);
	});
});
