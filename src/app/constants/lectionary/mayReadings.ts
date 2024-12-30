import { BookId } from "@/app/enums";
import { Month } from "@/app/interfaces";

export const mayReadings: Month = {
	name: "May",
	days: [
		{
			reading_1: [
				{
					book: { id: BookId.Samuel1 },
					chapters: "2",
					verses: "1-10",
				},
			],
			reading_2: [
				{
					book: { id: BookId.Titus },
				},
				{
					book: { id: BookId.Philemon },
				},
			],
		},
	],
};
