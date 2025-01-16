import { BookId } from "@/app/enums";

export interface Chapters {
	first: number;
	last: number;
}

export interface Day {
	ofTheMonth: number;
	firstReading: Reading[];
	secondReading: Reading[];
}

export interface Month {
	name: string;
	days: Day[];
}

export interface Reading {
	bookId: BookId;
	chapters?: Chapters;
	verses?: Verses;
}

export interface Verses {
	first: number;
	last: number;
}
