import lectionary from "@/app/constants/lectionary";
import { bookNames, chapterCounts } from "@/app/constants";
import { BookId } from "@/app/enums";

const allReadings = lectionary.flatMap((month) =>
	month.days.flatMap((day) =>
		[...day.firstReading, ...day.secondReading].map((reading) => ({
			label: `${month.name} ${day.ofTheMonth}: ${bookNames[reading.bookId]}`,
			reading,
		}))
	)
);

describe("lectionary", () => {
	it.each(allReadings)(
		"$label has chapters that exist in the book",
		({ reading }) => {
			if (!reading.chapters) return;
			const { first, last } = reading.chapters;
			expect(first).toBeGreaterThanOrEqual(1);
			expect(last).toBeGreaterThanOrEqual(first);
			expect(last).toBeLessThanOrEqual(chapterCounts[reading.bookId]);
		}
	);
});

describe("January 18", () => {
	it("reads Genesis 10-12 for the second reading", () => {
		const january18 = lectionary[0].days.find((day) => day.ofTheMonth === 18);
		expect(january18?.secondReading).toEqual([
			{ bookId: BookId.Genesis, chapters: { first: 10, last: 12 } },
		]);
	});
});
