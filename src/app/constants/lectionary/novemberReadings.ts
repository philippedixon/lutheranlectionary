import { BookId } from "@/app/enums";
import { Month } from "@/app/interfaces";

export const novemberReadings: Month = {
	name: "November",
	days: [
		{
			ofMonth: 1,
			reading_1: [
				{
					bookId: BookId.Exodus,
					chapters: { first: 15, last: 15 },
					verses: { first: 1, last: 8 },
				},
			],
			reading_2: [
				{
					bookId: BookId.Hosea,
					chapters: { first: 8, last: 10 },
				},
			],
		},
		{
			ofMonth: 2,
			reading_1: [
				{
					bookId: BookId.Psalms,
					chapters: { first: 122, last: 122 },
				},
			],
			reading_2: [
				{
					bookId: BookId.Hosea,
					chapters: { first: 11, last: 14 },
				},
			],
		},
		{
			ofMonth: 3,
			reading_1: [
				{
					bookId: BookId.Psalms,
					chapters: { first: 123, last: 123 },
				},
			],
			reading_2: [
				{
					bookId: BookId.Joel,
				},
			],
		},
		{
			ofMonth: 4,
			reading_1: [
				{ bookId: BookId.Psalms, chapters: { first: 124, last: 124 } },
			],
			reading_2: [{ bookId: BookId.Amos, chapters: { first: 1, last: 5 } }],
		},
		{
			ofMonth: 5,
			reading_1: [
				{ bookId: BookId.Psalms, chapters: { first: 125, last: 125 } },
			],
			reading_2: [{ bookId: BookId.Amos, chapters: { first: 6, last: 9 } }],
		},
	],
};
