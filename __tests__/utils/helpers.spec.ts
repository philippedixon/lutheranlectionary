import { BookId } from "@/app/enums";
import {
	fetchChapter,
	fetchBook,
	fetchReading,
	parseChapter,
	fetchAvailableTranslations,
} from "@/app/utils";
import { ChapterVerse, Reading } from "@/app/interfaces";
import { lukeTranslationBookChapter } from "../../__mocks__/content";

describe("fetchAvailableTranslations", () => {
	afterEach(() => jest.clearAllMocks());

	it("should fetch available translations from the API", async () => {
		const mockTranslations = {
			translations: [
				{ id: "BSB", languageEnglishName: "English" },
				{ id: "FRN", languageEnglishName: "French" },
			],
		};

		global.fetch = jest.fn(() =>
			Promise.resolve({
				headers: { get: () => "application/json" },
				json: () => Promise.resolve(mockTranslations),
				ok: true,
			})
		) as jest.Mock;

		const response = await fetchAvailableTranslations();

		expect(global.fetch).toHaveBeenCalledWith(
			"https://bible.helloao.org/api/available_translations.json"
		);
		expect(response).toEqual(mockTranslations);
	});

	it("should check for non-OK response and return empty array", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				headers: { get: () => "application/json" },
				text: () => Promise.resolve("Error occurred"),
				ok: false,
				status: 500,
			})
		) as jest.Mock;

		const response = await fetchAvailableTranslations();

		expect(response).toEqual({ translations: [] });
	});

	it("should check for invalid content-type and return empty array", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		global.fetch = jest.fn(() =>
			Promise.resolve({
				headers: { get: () => "text/html" },
				text: () => Promise.resolve("<html>Error</html>"),
				ok: true,
			})
		) as jest.Mock;

		const response = await fetchAvailableTranslations();

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			expect.stringContaining(
				"Unexpected content-type when fetching translations:"
			),
			"<html>Error</html>"
		);
		expect(response).toEqual({ translations: [] });

		consoleErrorSpy.mockRestore();
	});

	it.each([undefined, ""])(
		"should verify JSON parsing and return empty array on failure",
		async (jsonResult) => {
			const consoleErrorSpy = jest
				.spyOn(console, "error")
				.mockImplementation(() => {});

			global.fetch = jest.fn(() =>
				Promise.resolve({
					headers: { get: () => "application/json" },
					ok: true,
					json: () => Promise.resolve(jsonResult),
				})
			) as jest.Mock;

			const response = await fetchAvailableTranslations();

			expect(response).toEqual({ translations: [] });
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				expect.stringContaining("Invalid translations payload:"),
				jsonResult
			);

			consoleErrorSpy.mockRestore();
		}
	);

	it("should handle fetch errors gracefully and return empty array", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		global.fetch = jest.fn(() => Promise.reject("Network error")) as jest.Mock;

		const response = await fetchAvailableTranslations();

		expect(response).toEqual({ translations: [] });
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Error fetching available translations:",
			"Network error"
		);

		consoleErrorSpy.mockRestore();
	});
});

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
