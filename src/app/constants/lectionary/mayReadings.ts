import { Book, BookId } from "@/app/enums";
import { Month } from "@/app/interfaces";

export const mayReadings: Month = {
	name: "May",
	days: [
		{
			reading_1: [
				{
					book: { name: Book.Samuel1, id: BookId.Samuel1 },
					chapters: "2",
					verses: "1-10",
				},
			],
			reading_2: [
				{
					book: { name: Book.Titus, id: BookId.Titus },
				},
				{
					book: { name: Book.Philemon, id: BookId.Philemon },
				},
			],
		},
	],
};
