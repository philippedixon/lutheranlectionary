import { BookId } from "@/app/enums";
import { fetchChapter } from "@/app/utils";

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

	it("should return undefined if an error occurs", async () => {
		global.fetch = jest.fn(() => Promise.reject("Error")) as jest.Mock;

		const result = await fetchChapter("BSB", BookId.Revelation, 1);

		expect(result).toBeUndefined();
	});
});
