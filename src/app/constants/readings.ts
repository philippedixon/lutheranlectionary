import { Books } from "@/app/enums/books";

export interface Reading {
	book: Books;
	chapters: string;
	verses?: string;
}

export interface Day {
	reading_1: Reading;
	reading_2: Reading;
}

export interface Month {
	name: string;
	days: Day[];
}

export type Lectionary = Month[];

export const januaryReadings: Month = {
	name: "January",
	days: [
		{
			reading_1: { book: Books.Luke, chapters: "1", verses: "68-79" },
			reading_2: { book: Books.Mark, chapters: "2" },
		},
	],
};

export const februaryReadings: Month = { name: "February", days: [] };
export const marchReadings: Month = { name: "March", days: [] };
export const aprilReadings: Month = { name: "April", days: [] };
export const mayReadings: Month = { name: "May", days: [] };
export const juneReadings: Month = { name: "June", days: [] };
export const julyReadings: Month = { name: "July", days: [] };
export const augustReadings: Month = { name: "August", days: [] };
export const septemberReadings: Month = { name: "September", days: [] };
export const octoberReadings: Month = { name: "October", days: [] };
export const novemberReadings: Month = { name: "November", days: [] };

export const decemberReadings: Month = {
	name: "December",
	days: [
		{
			reading_1: { book: Books.Luke, chapters: "1", verses: "46-55" },
			reading_2: { book: Books.Revelation, chapters: "1-2" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "1" },
			reading_2: { book: Books.Revelation, chapters: "3-5" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "2" },
			reading_2: { book: Books.Revelation, chapters: "6-8" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "3" },
			reading_2: { book: Books.Revelation, chapters: "9-11" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "4" },
			reading_2: { book: Books.Revelation, chapters: "12-14" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "5" },
			reading_2: { book: Books.Revelation, chapters: "15-17" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "6" },
			reading_2: { book: Books.Revelation, chapters: "18-20" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "7" },
			reading_2: { book: Books.Revelation, chapters: "21-22" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "8" },
			reading_2: { book: Books.Isaiah, chapters: "1-3" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "9" },
			reading_2: { book: Books.Isaiah, chapters: "4-6" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "10" },
			reading_2: { book: Books.Isaiah, chapters: "7-9" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "11" },
			reading_2: { book: Books.Isaiah, chapters: "10-12" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "12" },
			reading_2: { book: Books.Isaiah, chapters: "13-15" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "13" },
			reading_2: { book: Books.Isaiah, chapters: "16-18" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "14" },
			reading_2: { book: Books.Isaiah, chapters: "19-21" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "15" },
			reading_2: { book: Books.Isaiah, chapters: "22-24" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "16" },
			reading_2: { book: Books.Isaiah, chapters: "25-27" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "17" },
			reading_2: { book: Books.Isaiah, chapters: "28-30" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "18" },
			reading_2: { book: Books.Isaiah, chapters: "31-33" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "19" },
			reading_2: { book: Books.Isaiah, chapters: "34-36" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "20" },
			reading_2: { book: Books.Isaiah, chapters: "37-39" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "21" },
			reading_2: { book: Books.Isaiah, chapters: "40-42" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "22" },
			reading_2: { book: Books.Isaiah, chapters: "43-45" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "23" },
			reading_2: { book: Books.Isaiah, chapters: "46-48" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "24" },
			reading_2: { book: Books.Isaiah, chapters: "49-51" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "25" },
			reading_2: { book: Books.Isaiah, chapters: "52-54" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "26" },
			reading_2: { book: Books.Isaiah, chapters: "55-57" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "27" },
			reading_2: { book: Books.Isaiah, chapters: "58-60" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "28" },
			reading_2: { book: Books.Isaiah, chapters: "61-63" },
		},
		{
			reading_1: { book: Books.Psalms, chapters: "29" },
			reading_2: { book: Books.Isaiah, chapters: "64-66" },
		},
		{
			reading_1: { book: Books.Luke, chapters: "1", verses: "46-55" },
			reading_2: { book: Books.Mark, chapters: "1" },
		},
	],
};

export const lectionary: Lectionary = [
	januaryReadings,
	februaryReadings,
	marchReadings,
	aprilReadings,
	mayReadings,
	juneReadings,
	julyReadings,
	augustReadings,
	septemberReadings,
	octoberReadings,
	novemberReadings,
	decemberReadings,
];
