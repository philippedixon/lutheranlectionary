import { Reading } from "@/app/constants/readings";

export const getReadingDisplay = (reading: Reading) => {
	const { book, chapters, verses } = reading;
	let display = `${book} ${chapters}`;
	display = verses ? `${display}:${verses}` : display;
	return display;
};
