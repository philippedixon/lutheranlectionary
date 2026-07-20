import { getAdjacentDay } from "@/app/utils";

describe("getAdjacentDay", () => {
	it("returns the next day within the same month", () => {
		expect(getAdjacentDay(0, 4, 1)).toEqual({ monthIndex: 0, day: 5 });
	});

	it("returns the previous day within the same month", () => {
		expect(getAdjacentDay(0, 4, -1)).toEqual({ monthIndex: 0, day: 3 });
	});

	it("wraps to the first day of the next month past the end of a month", () => {
		expect(getAdjacentDay(0, 31, 1)).toEqual({ monthIndex: 1, day: 1 });
	});

	it("wraps to the last day of the previous month before the first day", () => {
		expect(getAdjacentDay(1, 1, -1)).toEqual({ monthIndex: 0, day: 31 });
	});

	it("wraps from December's last day to January 1", () => {
		expect(getAdjacentDay(11, 31, 1)).toEqual({ monthIndex: 0, day: 1 });
	});

	it("wraps from January 1 to December's last day", () => {
		expect(getAdjacentDay(0, 1, -1)).toEqual({ monthIndex: 11, day: 31 });
	});
});
