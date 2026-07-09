import { render, screen } from "@testing-library/react";
import { lukeTranslationBookChapter } from "../../__mocks__/content";
import lectionary from "@/app/constants/lectionary";
import { VersePassage } from "@/app/components";
import { BookId } from "@/app/enums";
import { TranslationBookChapter } from "@/app/interfaces";

const singleVerseChapter = (
	content: TranslationBookChapter["chapter"]["content"]
): TranslationBookChapter =>
	({
		book: { id: "PSA" },
		chapter: { number: 1, content },
	} as unknown as TranslationBookChapter);

describe("VersePassage", () => {
	beforeEach(() => {
		render(
			<VersePassage
				passageChapter={lukeTranslationBookChapter}
				readingInformation={lectionary[0].days[0].firstReading[0]}
			/>
		);
	});

	it("should display the title of the passage", () => {
		const title = document.querySelector("h3");

		expect(title).toHaveTextContent("Luke 1:68-79");
	});

	it("should display only the verses in the passage", () => {
		const previousVerse = screen.queryByTestId("1:67-0");
		const firstVerse = screen.queryByTestId("1:68-0");
		const lastVerse = screen.queryByTestId("1:79-0");
		const followingVerse = screen.queryByTestId("1:80-0");

		expect(previousVerse).not.toBeInTheDocument();
		expect(firstVerse).toHaveTextContent(
			"Blessed be the Lord, the God of Israel,"
		);
		expect(lastVerse).toHaveTextContent(
			"to shine on those who live in darkness"
		);
		expect(followingVerse).not.toBeInTheDocument();
	});
});

describe("VersePassage with missing chapter data", () => {
	it("shows an unavailable message when the chapter has no data", () => {
		render(
			<VersePassage
				passageChapter={undefined as unknown as TranslationBookChapter}
				readingInformation={{
					bookId: BookId.Luke,
					chapters: { first: 1, last: 1 },
					verses: { first: 68, last: 79 },
				}}
			/>
		);

		expect(
			screen.getByText("Passage not available in this translation.")
		).toBeInTheDocument();
	});

	it("does not show the unavailable message when content is present", () => {
		render(
			<VersePassage
				passageChapter={lukeTranslationBookChapter}
				readingInformation={lectionary[0].days[0].firstReading[0]}
			/>
		);

		expect(
			screen.queryByText("Passage not available in this translation.")
		).not.toBeInTheDocument();
	});
});

describe("VersePassage poetry column", () => {
	const readingInformation = {
		bookId: BookId.Psalms,
		verses: { first: 1, last: 1 },
	};

	it("applies the poetry column when the passage contains poem-formatted text", () => {
		const { container } = render(
			<VersePassage
				passageChapter={singleVerseChapter([
					{ type: "verse", number: 1, content: [{ poem: 1, text: "A poem line" }] },
				])}
				readingInformation={readingInformation}
			/>
		);

		expect(container.firstChild).toHaveClass("poetry-passage");
	});

	it("does not apply the poetry column for plain prose", () => {
		const { container } = render(
			<VersePassage
				passageChapter={singleVerseChapter([
					{ type: "verse", number: 1, content: ["A prose line"] },
				])}
				readingInformation={readingInformation}
			/>
		);

		expect(container.firstChild).not.toHaveClass("poetry-passage");
	});
});
