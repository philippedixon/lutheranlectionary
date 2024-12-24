import { Book, BookId } from "@/app/enums";

export interface BibleBook {
	name: Book;
	id: BookId;
}

export interface Reading {
	book: BibleBook;
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
