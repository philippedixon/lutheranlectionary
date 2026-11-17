import { EsvApiStrategy } from "@/lib/api/strategies/EsvApiStrategy";
import { BookId } from "@/app/enums";
import type { Reading } from "@/app/interfaces";
import {
	esvChapterPassages,
	esvHtmlResponse,
	mockEsvFetchByQuery,
} from "../../../../__mocks__/esv-api";

const [chapterOne, chapterTwo, chapterThree] = esvChapterPassages;

const calledQueries = () =>
	(global.fetch as jest.Mock).mock.calls.map(
		([url]: [string]) =>
			new URL(url, "http://localhost").searchParams.get("q")
	);

describe("EsvApiStrategy", () => {
	let consoleErrorSpy: jest.SpyInstance;

	beforeEach(() => {
		consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
	});

	afterEach(() => jest.restoreAllMocks());

	it("fetches a verse-range reading with a single query", async () => {
		global.fetch = mockEsvFetchByQuery({
			"John 11:35": esvHtmlResponse.passages,
		});

		const reading: Reading = {
			bookId: BookId.John,
			chapters: { first: 11, last: 11 },
			verses: { first: 35, last: 35 },
		};
		const result = await new EsvApiStrategy().fetchData(reading);

		expect(calledQueries()).toEqual(["John 11:35"]);
		expect(result).toEqual(esvHtmlResponse.passages);
	});

	it("fetches a single-chapter reading with a single query", async () => {
		global.fetch = mockEsvFetchByQuery({ "John 1": [chapterOne] });

		const reading: Reading = {
			bookId: BookId.John,
			chapters: { first: 1, last: 1 },
		};
		const result = await new EsvApiStrategy().fetchData(reading);

		expect(calledQueries()).toEqual(["John 1"]);
		expect(result).toEqual([chapterOne]);
	});

	it("fetches a whole-book reading one chapter at a time", async () => {
		global.fetch = mockEsvFetchByQuery({
			"Joel 1": [chapterOne],
			"Joel 2": [chapterTwo],
			"Joel 3": [chapterThree],
		});

		const result = await new EsvApiStrategy().fetchData({
			bookId: BookId.Joel,
		});

		expect(calledQueries()).toEqual(["Joel 1", "Joel 2", "Joel 3"]);
		expect(result).toEqual([chapterOne, chapterTwo, chapterThree]);
	});

	it("fetches a chapter-range reading one chapter at a time", async () => {
		global.fetch = mockEsvFetchByQuery({
			"Amos 1": [chapterOne],
			"Amos 2": [chapterTwo],
			"Amos 3": [chapterThree],
		});

		const reading: Reading = {
			bookId: BookId.Amos,
			chapters: { first: 1, last: 3 },
		};
		await new EsvApiStrategy().fetchData(reading);

		expect(calledQueries()).toEqual(["Amos 1", "Amos 2", "Amos 3"]);
	});

	it("keeps chapters in order even when a later chapter resolves first", async () => {
		const slowChapterOne = () =>
			new Promise<{ ok: boolean; json: () => Promise<unknown> }>((resolve) =>
				setTimeout(
					() =>
						resolve({
							ok: true,
							json: () => Promise.resolve({ passages: [chapterOne] }),
						}),
					10
				)
			);
		const fastChapterTwo = () =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ passages: [chapterTwo] }),
			});
		global.fetch = jest.fn((url: string) =>
			url.includes("Joel+1") ? slowChapterOne() : fastChapterTwo()
		) as jest.Mock;

		const reading: Reading = {
			bookId: BookId.Joel,
			chapters: { first: 1, last: 2 },
		};
		const result = await new EsvApiStrategy().fetchData(reading);

		expect(result).toEqual([chapterOne, chapterTwo]);
	});

	it("retries a chapter once when its first request fails", async () => {
		let chapterTwoAttempts = 0;
		global.fetch = mockEsvFetchByQuery({
			"Joel 1": [chapterOne],
			"Joel 2": () =>
				++chapterTwoAttempts === 1 ? new Error("Network error") : [chapterTwo],
			"Joel 3": [chapterThree],
		});

		const result = await new EsvApiStrategy().fetchData({
			bookId: BookId.Joel,
		});

		expect(calledQueries().filter((q) => q === "Joel 2")).toHaveLength(2);
		expect(result).toEqual([chapterOne, chapterTwo, chapterThree]);
	});

	it("throws when a chapter fails twice and returns nothing partial", async () => {
		global.fetch = mockEsvFetchByQuery({
			"Joel 1": [chapterOne],
			"Joel 2": new Error("Network error"),
			"Joel 3": [chapterThree],
		});

		await expect(
			new EsvApiStrategy().fetchData({ bookId: BookId.Joel })
		).rejects.toThrow();

		expect(calledQueries().filter((q) => q === "Joel 2")).toHaveLength(2);
		expect(consoleErrorSpy).toHaveBeenCalled();
	});

	it("treats an empty passages response as a failure", async () => {
		global.fetch = mockEsvFetchByQuery({
			"Joel 1": [chapterOne],
			"Joel 2": [],
			"Joel 3": [chapterThree],
		});

		await expect(
			new EsvApiStrategy().fetchData({ bookId: BookId.Joel })
		).rejects.toThrow();

		expect(calledQueries().filter((q) => q === "Joel 2")).toHaveLength(2);
		expect(consoleErrorSpy).toHaveBeenCalled();
	});
});
