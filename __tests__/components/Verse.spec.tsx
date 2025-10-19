import React from "react";
import { render } from "@testing-library/react";
import { Verse } from "@/app/components";
import {
	ChapterVerse,
	FormattedText,
	InlineHeading,
	InlineLineBreak,
} from "@/app/interfaces";

describe("Verse Component", () => {
	it("renders a string verse line", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 1,
			content: ["In the beginning God created the heavens and the earth."],
		};
		const { getByText } = render(<Verse line={line} bookChapterNumber={1} />);
		expect(
			getByText("In the beginning God created the heavens and the earth.")
		).toBeInTheDocument();
	});

	it("renders an inline break", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 1,
			content: [{ lineBreak: true } as InlineLineBreak],
		};
		const { container } = render(<Verse line={line} bookChapterNumber={1} />);
		expect(container.querySelector("p")).toBeInTheDocument();
	});

	it("renders a poem", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 1,
			content: [{ poem: 1, text: "In the beginning" } as FormattedText],
		};
		const { getByText } = render(<Verse line={line} bookChapterNumber={1} />);
		const poemElement = getByText("In the beginning");

		expect(poemElement).toBeInTheDocument();
		expect(poemElement.tagName).toBe("PRE");
	});

	it("renders words of Jesus in red", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 1,
			content: [{ wordsOfJesus: true, text: "I am the way" } as FormattedText],
		};
		const { getByText } = render(<Verse line={line} bookChapterNumber={1} />);

		expect(getByText("I am the way")).toHaveClass("text-red-500");
	});

	it("renders a heading", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 1,
			content: [{ heading: "The Beginning" } as InlineHeading],
		};
		const { getByText } = render(<Verse line={line} bookChapterNumber={1} />);
		expect(getByText("The Beginning")).toBeInTheDocument();
	});
});
