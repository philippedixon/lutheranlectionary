import { findLectionaryDay } from "@/app/utils";
import lectionary from "@/app/constants/lectionary";

describe("findLectionaryDay", () => {
	it.each([
		["1", "1"],
		["11", "3"],
		["12", "31"],
	])("finds the reading day for /%s/%s", (month, day) => {
		expect(findLectionaryDay(month, day)).toBe(
			lectionary[Number(month) - 1].days[Number(day) - 1]
		);
	});

	it("shows February 28's readings on February 29", () => {
		expect(findLectionaryDay("2", "29")).toBe(lectionary[1].days[27]);
	});

	it.each([
		["0", "5"],
		["13", "5"],
		["1", "0"],
		["1", "32"],
		["2", "30"],
		["4", "31"],
		["12abc", "5"],
		["1", "5x"],
		["-1", "5"],
		["Web", "Auth"],
		["wp-admin", "install.php"],
		["", ""],
		[undefined, undefined],
	])("returns undefined for /%s/%s", (month, day) => {
		expect(findLectionaryDay(month, day)).toBeUndefined();
	});
});
