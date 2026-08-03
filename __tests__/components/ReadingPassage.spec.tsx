import { render, screen } from "@testing-library/react";
import { ReadingPassage } from "@/app/components";
import { genesisPassage } from "../../__mocks__/helloao-api";
import { TranslationBookChapter } from "@/app/interfaces";

const chapterWith = (
	content: TranslationBookChapter["chapter"]["content"]
): TranslationBookChapter[] =>
	[
		{ book: { id: "PSA" }, chapter: { number: 1, content } },
	] as unknown as TranslationBookChapter[];

describe("ReadingPassage", () => {
	beforeEach(() => {
		render(
			<ReadingPassage passageChapters={genesisPassage} />
		);
	});

	it("should display headings in the passage", () => {
		const passageHeading = screen.queryByText("The Creation");

		expect(passageHeading).toBeInTheDocument();
	});

	it("should center and size the pericope heading at 24px, capped to the poetry column width", () => {
		const passageHeading = screen.getByText("The Creation");

		expect(passageHeading).toHaveClass("text-center", "text-[24px]", "max-w-[480px]", "mx-auto");
	});

	it("should display the chapter number for the passage", () => {
		const chapterNumber = screen.queryByTestId("1:1-0");

		expect(chapterNumber).toHaveTextContent("1");
	});

	it("should display the passage text with verse numbers", () => {
		const secondVerseNumber = screen.queryByTestId("1:2-0");
		const lastVerseNumber = screen.queryByTestId("1:31-0");

		expect(secondVerseNumber).toBeInTheDocument();
		expect(lastVerseNumber).toBeInTheDocument();
	});

	it.todo(
		"should not display the first verse number if it is the start of a chapter"
	);
});

describe("ReadingPassage with missing chapter data", () => {
	it("shows an unavailable message when no chapter has data", () => {
		render(
			<ReadingPassage passageChapters={[{} as TranslationBookChapter]} />
		);

		expect(
			screen.getByText("Passage not available in this translation.")
		).toBeInTheDocument();
	});

	it("does not show the unavailable message when content is present", () => {
		render(
			<ReadingPassage passageChapters={genesisPassage} />
		);

		expect(
			screen.queryByText("Passage not available in this translation.")
		).not.toBeInTheDocument();
	});
});

describe("ReadingPassage poetry column", () => {
	it("applies the poetry column when the passage contains poem-formatted text", () => {
		const { container } = render(
			<ReadingPassage
				passageChapters={chapterWith([
					{ type: "verse", number: 1, content: [{ poem: 1, text: "A poem line" }] },
				])}
			/>
		);

		expect(container.firstChild).toHaveClass("poetry-passage");
	});

	it("does not apply the poetry column for plain prose", () => {
		const { container } = render(
			<ReadingPassage
				passageChapters={chapterWith([
					{ type: "verse", number: 1, content: ["A prose line"] },
				])}
			/>
		);

		expect(container.firstChild).not.toHaveClass("poetry-passage");
	});
});

describe("ReadingPassage hebrew_subtitle", () => {
	it("renders the subtitle text, centered, italic, and width-capped", () => {
		render(
			<ReadingPassage
				passageChapters={chapterWith([
					{
						type: "hebrew_subtitle",
						content: ["A Psalm. A song for the Sabbath day."],
					},
					{ type: "verse", number: 1, content: ["A verse line"] },
				])}
			/>
		);

		const subtitle = screen.getByText("A Psalm. A song for the Sabbath day.");
		expect(subtitle).toHaveClass(
			"italic",
			"text-center",
			"text-[15px]",
			"max-w-[480px]",
			"mx-auto"
		);
	});
});
