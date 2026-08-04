import { contrastRatio } from "@/app/utils";

describe("contrastRatio", () => {
	it("computes the WCAG contrast ratio between two hex colors", () => {
		// black on white is the maximum possible ratio, 21:1
		expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 0);
	});

	it("returns 1 for identical colors", () => {
		expect(contrastRatio("#A6873A", "#A6873A")).toBeCloseTo(1, 5);
	});

	it("flags the current light-theme gold as failing WCAG AA (4.5:1) against the light background", () => {
		expect(contrastRatio("#A6873A", "#F3ECDD")).toBeLessThan(4.5);
	});

	it("confirms the new deep ochre gold passes WCAG AA against the light background", () => {
		expect(contrastRatio("#7A5C1A", "#F3ECDD")).toBeGreaterThanOrEqual(4.5);
	});
});
