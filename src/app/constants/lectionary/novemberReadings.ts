import { BookId } from "@/app/enums";
import { Month } from "@/app/interfaces";

export const novemberReadings: Month = {
	name: "November",
	days: [
		{
			reading_1: [
				{
					bookId: BookId.Exodus,
					chapters: "15",
					verses: "1-8",
				},
			],
			reading_2: [
				{
					bookId: BookId.Hosea,
					chapters: "8-10",
				},
			],
		},
		{
			reading_1: [
				{
					bookId: BookId.Psalms,
					chapters: "122",
				},
			],
			reading_2: [
				{
					bookId: BookId.Hosea,
					chapters: "11-14",
				},
			],
		},
		{
			reading_1: [
				{
					bookId: BookId.Psalms,
					chapters: "123",
				},
			],
			reading_2: [
				{
					bookId: BookId.Joel,
				},
			],
		},
		{
			reading_1: [{ bookId: BookId.Psalms, chapters: "124" }],
			reading_2: [{ bookId: BookId.Amos, chapters: "1-5" }],
		},
		{
			reading_1: [{ bookId: BookId.Psalms, chapters: "125" }],
			reading_2: [{ bookId: BookId.Amos, chapters: "6-9" }],
		},
	],
};
