import lectionary from "@/app/constants/lectionary";
import { bookNames, chapterCounts } from "@/app/constants";
import verseCounts from "../../__mocks__/lectionary-verse-counts.json";

// Verse counts per chapter captured from the live ESV and HelloAO (BSB) APIs
// for every chapter the lectionary reads. Lets us check readings offline.
type ChapterVerseCounts = { esv: number; bsb: number };
const counts = verseCounts as Record<string, ChapterVerseCounts>;

const allReadings = lectionary.flatMap((month) =>
	month.days.flatMap((day) =>
		[...day.firstReading, ...day.secondReading].map((reading) => ({
			label: `${month.name} ${day.ofTheMonth}: ${bookNames[reading.bookId]}`,
			reading,
		}))
	)
);

describe("lectionary verse counts", () => {
	it.each(allReadings)(
		"$label has every chapter in both translations",
		({ reading }) => {
			const first = reading.chapters?.first ?? 1;
			const last = reading.chapters?.last ?? chapterCounts[reading.bookId];
			for (let chapter = first; chapter <= last; chapter++) {
				const chapterVerses = counts[`${reading.bookId}/${chapter}`];
				expect(chapterVerses?.esv).toBeGreaterThan(0);
				expect(chapterVerses?.bsb).toBeGreaterThan(0);
			}
		}
	);

	it.each(allReadings.filter(({ reading }) => reading.verses))(
		"$label has verses that exist in both translations",
		({ reading }) => {
			const chapter = counts[`${reading.bookId}/${reading.chapters!.first}`];
			const { first, last } = reading.verses!;
			expect(first).toBeGreaterThanOrEqual(1);
			expect(last).toBeGreaterThanOrEqual(first);
			expect(last).toBeLessThanOrEqual(Math.min(chapter.esv, chapter.bsb));
		}
	);
});
