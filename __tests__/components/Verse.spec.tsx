import React from "react";
import { render } from "@testing-library/react";
import { Verse } from "@/app/components";
import { SelectionsContext } from "@/app/contexts";
import {
	ChapterVerse,
	FormattedText,
	InlineHeading,
	InlineLineBreak,
	Selections,
} from "@/app/interfaces";

const renderWithSelections = (
	ui: React.ReactElement,
	selections: Selections
) =>
	render(
		<SelectionsContext.Provider value={selections}>
			{ui}
		</SelectionsContext.Provider>
	);

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

	it("does not italicise regular prose verse text", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 2,
			content: ["Now the earth was formless and empty."],
		};
		const { getByText } = render(<Verse line={line} bookChapterNumber={1} />);
		expect(getByText("Now the earth was formless and empty.")).not.toHaveClass("italic");
	});

	it("does not italicise words of Jesus", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 6,
			content: [{ wordsOfJesus: true, text: "I am the way" } as FormattedText],
		};
		const { getByText } = render(<Verse line={line} bookChapterNumber={14} />);
		expect(getByText("I am the way")).not.toHaveClass("italic");
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
		expect(poemElement.tagName).toBe("P");
		expect(poemElement).toHaveClass("italic");
		expect(poemElement).toHaveClass("poem-line");
	});

	it("renders words of Jesus in the words-of-christ color", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 1,
			content: [{ wordsOfJesus: true, text: "I am the way" } as FormattedText],
		};
		const { getByText } = render(<Verse line={line} bookChapterNumber={1} />);

		expect(getByText("I am the way")).toHaveClass("text-words-of-christ");
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

	describe("reading font", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 2,
			content: ["Now the earth was formless and empty."],
		};

		it("defaults to EB Garamond when no bodyFont selection is set", () => {
			const { getByText } = renderWithSelections(
				<Verse line={line} bookChapterNumber={1} />,
				{}
			);
			expect(getByText(line.content[0] as string)).toHaveClass("font-eb-garamond");
		});

		it("uses Source Serif 4 when selected", () => {
			const { getByText } = renderWithSelections(
				<Verse line={line} bookChapterNumber={1} />,
				{ bodyFont: "serif4" }
			);
			const p = getByText(line.content[0] as string);
			expect(p).toHaveClass("font-source-serif");
			expect(p).not.toHaveClass("font-eb-garamond");
		});
	});

	describe("text size", () => {
		const line: ChapterVerse = {
			type: "verse",
			number: 2,
			content: ["Now the earth was formless and empty."],
		};

		it("defaults to 19px when no fontSize selection is set", () => {
			const { getByText } = renderWithSelections(
				<Verse line={line} bookChapterNumber={1} />,
				{}
			);
			expect(getByText(line.content[0] as string)).toHaveClass("text-[19px]");
		});

		it("uses 17px when small is selected", () => {
			const { getByText } = renderWithSelections(
				<Verse line={line} bookChapterNumber={1} />,
				{ fontSize: "small" }
			);
			expect(getByText(line.content[0] as string)).toHaveClass("text-[17px]");
		});

		it("uses 22px when large is selected", () => {
			const { getByText } = renderWithSelections(
				<Verse line={line} bookChapterNumber={1} />,
				{ fontSize: "large" }
			);
			expect(getByText(line.content[0] as string)).toHaveClass("text-[22px]");
		});
	});
});
