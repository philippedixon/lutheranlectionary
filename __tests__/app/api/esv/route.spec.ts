/**
 * @jest-environment node
 */
import { GET } from "@/app/api/esv/route";
import { esvHtmlResponse } from "../../../../__mocks__/esv-api";

const makeRequest = (q?: string) => {
	const url =
		q === undefined
			? "http://localhost/api/esv"
			: `http://localhost/api/esv?q=${encodeURIComponent(q)}`;
	return new Request(url);
};

describe("GET /api/esv", () => {
	const ORIGINAL_KEY = process.env.ESV_API_KEY;

	beforeEach(() => {
		process.env.ESV_API_KEY = "test-key";
	});

	afterEach(() => {
		process.env.ESV_API_KEY = ORIGINAL_KEY;
		jest.restoreAllMocks();
	});

	it("calls the ESV API with the query, auth token, and title-suppressing params", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(esvHtmlResponse),
			})
		) as jest.Mock;

		const response = await GET(makeRequest("John 11:35"));
		const body = await response.json();

		expect(global.fetch).toHaveBeenCalledTimes(1);
		const [calledUrl, options] = (global.fetch as jest.Mock).mock.calls[0];

		expect(calledUrl).toContain("https://api.esv.org/v3/passage/html/");
		expect(calledUrl).toContain("q=John+11%3A35");
		expect(calledUrl).toContain("include-passage-references=false");
		expect(calledUrl).toContain("include-audio-link=false");
		expect(calledUrl).toContain("include-verse-numbers=true");
		expect(calledUrl).toContain("include-headings=true");
		expect(options.headers.Authorization).toBe("Token test-key");

		expect(body).toEqual({ passages: esvHtmlResponse.passages });
	});

	it("returns empty passages and logs when the query is missing", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		global.fetch = jest.fn() as jest.Mock;

		const response = await GET(makeRequest(undefined));
		const body = await response.json();

		expect(global.fetch).not.toHaveBeenCalled();
		expect(body).toEqual({ passages: [] });
		expect(consoleErrorSpy).toHaveBeenCalled();
	});

	it("returns empty passages and logs when the API key is missing", async () => {
		delete process.env.ESV_API_KEY;
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		global.fetch = jest.fn() as jest.Mock;

		const response = await GET(makeRequest("John 11:35"));
		const body = await response.json();

		expect(global.fetch).not.toHaveBeenCalled();
		expect(body).toEqual({ passages: [] });
		expect(consoleErrorSpy).toHaveBeenCalled();
	});

	it("returns empty passages and logs when the ESV API responds non-ok", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				status: 401,
				text: () => Promise.resolve("Unauthorized"),
			})
		) as jest.Mock;

		const response = await GET(makeRequest("John 11:35"));
		const body = await response.json();

		expect(body).toEqual({ passages: [] });
		expect(consoleErrorSpy).toHaveBeenCalled();
	});

	it("returns empty array when the ESV API response has no passages field", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ query: "John 11:35", canonical: "John 11:35" }),
			})
		) as jest.Mock;

		const response = await GET(makeRequest("John 11:35"));
		const body = await response.json();

		expect(body).toEqual({ passages: [] });
	});

	it("returns empty passages and logs when the fetch throws", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		global.fetch = jest.fn(() =>
			Promise.reject(new Error("Network error"))
		) as jest.Mock;

		const response = await GET(makeRequest("John 11:35"));
		const body = await response.json();

		expect(body).toEqual({ passages: [] });
		expect(consoleErrorSpy).toHaveBeenCalled();
	});
});
