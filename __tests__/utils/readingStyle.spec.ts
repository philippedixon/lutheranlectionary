import { headingSizeClass } from "@/app/utils/readingStyle";

describe("headingSizeClass", () => {
	it("returns text-[20px] for small", () => {
		expect(headingSizeClass("small")).toBe("text-[20px]");
	});

	it("returns text-[22px] for medium", () => {
		expect(headingSizeClass("medium")).toBe("text-[22px]");
	});

	it("returns text-[22px] for undefined (default)", () => {
		expect(headingSizeClass(undefined)).toBe("text-[22px]");
	});

	it("returns text-[26px] for large", () => {
		expect(headingSizeClass("large")).toBe("text-[26px]");
	});
});
