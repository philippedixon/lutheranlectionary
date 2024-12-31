import { BookId } from "@/app/enums";
import { Month } from "@/app/interfaces";

export const novemberReadings: Month = {
	name: "November",
	days: [
		{
			reading_1: [
				{
					book: { id: BookId.Exodus },
					chapters: "15",
					verses: "1-8",
				},
			],
			reading_2: [
				{
					book: { id: BookId.Hosea },
					chapters: "8-10",
				},
			],
		},
		{
			reading_1: [
				{
					book: { id: BookId.Psalms },
					chapters: "122",
				},
			],
			reading_2: [
				{
					book: { id: BookId.Hosea },
					chapters: "11-14",
				},
			],
		},
		{
			reading_1: [
				{
					book: { id: BookId.Psalms },
					chapters: "123",
				},
			],
			reading_2: [
				{
					book: { id: BookId.Joel },
				},
			],
		},
	],
};
