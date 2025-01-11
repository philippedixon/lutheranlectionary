import { BookId } from "@/app/enums";

export interface Reading {
	bookId: BookId;
	chapters?: string;
	verses?: string;
}

export interface Day {
	reading_1: Reading[];
	reading_2: Reading[];
}

export interface Month {
	name: string;
	days: Day[];
}
