import { EsvApiStrategy } from "@/lib/api/strategies/EsvApiStrategy";
import { BookId } from "@/app/enums";
import type { Reading } from "@/app/interfaces";
import { esvHtmlResponse } from "../../../../__mocks__/esv-api";

const makeResponse = (passages: string[]) =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({ passages }),
	});

describe("EsvApiStrategy", () => {
	afterEach(() => jest.restoreAllMocks());

	it("builds q from a verse-range reading and returns passages", async () => {
		global.fetch = jest.fn(() => makeResponse(esvHtmlResponse.passages)) as jest.Mock;

		const reading: Reading = {
			bookId: BookId.John,
			chapters: { first: 11, last: 11 },
			verses: { first: 35, last: 35 },
		};
		const strategy = new EsvApiStrategy();
		const result = await strategy.fetchData(reading);

		const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
		expect(calledUrl).toContain("q=John+11%3A35");
		expect(result).toEqual(esvHtmlResponse.passages);
	});

	it("builds q from a whole-chapter reading", async () => {
		global.fetch = jest.fn(() => makeResponse(["<p>Chapter text.</p>"])) as jest.Mock;

		const reading: Reading = {
			bookId: BookId.John,
			chapters: { first: 1, last: 1 },
		};
		const strategy = new EsvApiStrategy();
		await strategy.fetchData(reading);

		const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
		expect(calledUrl).toContain("q=John+1");
	});

	it("builds q from a whole-book reading (no chapters)", async () => {
		global.fetch = jest.fn(() => makeResponse(["<p>Book text.</p>"])) as jest.Mock;

		const reading: Reading = { bookId: BookId.John };
		const strategy = new EsvApiStrategy();
		await strategy.fetchData(reading);

		const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
		expect(calledUrl).toContain("q=John");
	});

	it("returns empty array when the route responds with empty passages", async () => {
		global.fetch = jest.fn(() => makeResponse([])) as jest.Mock;

		const reading: Reading = { bookId: BookId.John, chapters: { first: 1, last: 1 } };
		const strategy = new EsvApiStrategy();
		const result = await strategy.fetchData(reading);

		expect(result).toEqual([]);
	});

	it("returns empty array and logs when fetch throws", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		global.fetch = jest.fn(() => Promise.reject(new Error("Network error"))) as jest.Mock;

		const reading: Reading = { bookId: BookId.John, chapters: { first: 1, last: 1 } };
		const strategy = new EsvApiStrategy();
		const result = await strategy.fetchData(reading);

		expect(result).toEqual([]);
		expect(consoleErrorSpy).toHaveBeenCalled();
	});
});
