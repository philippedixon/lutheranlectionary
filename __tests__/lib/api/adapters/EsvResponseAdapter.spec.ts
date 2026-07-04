import { EsvResponseAdapter } from "@/lib/api/adapters/EsvResponseAdapter";
import {
	esvHtmlResponse,
	esvMultiPassageResponse,
} from "../../../../__mocks__/esv-api";

describe("EsvResponseAdapter", () => {
	it("returns the passages array from a valid response", () => {
		const result = EsvResponseAdapter.adapt(esvHtmlResponse);
		expect(result).toEqual(esvHtmlResponse.passages);
	});

	it("returns all entries when passages has multiple items", () => {
		const result = EsvResponseAdapter.adapt(esvMultiPassageResponse);
		expect(result).toEqual(esvMultiPassageResponse.passages);
		expect(result).toHaveLength(2);
	});

	it("returns empty array when passages is empty", () => {
		const result = EsvResponseAdapter.adapt({
			query: "John 1:1",
			canonical: "John 1:1",
			passages: [],
		});
		expect(result).toEqual([]);
	});

	it("returns empty array when passages is missing", () => {
		const result = EsvResponseAdapter.adapt({
			query: "John 1:1",
			canonical: "John 1:1",
		} as never);
		expect(result).toEqual([]);
	});

	it("returns empty array when input is null", () => {
		const result = EsvResponseAdapter.adapt(null as never);
		expect(result).toEqual([]);
	});
});
