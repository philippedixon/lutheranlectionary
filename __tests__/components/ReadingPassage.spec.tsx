import { render, screen } from "@testing-library/react";
import { ReadingPassage } from "@/app/components";
import { genesisPassage } from "../../__mocks__/helloao-api";
import { Book, BookId } from "@/app/enums";

describe("ReadingPassage", () => {
	beforeEach(() => {
		render(
			<ReadingPassage
				passageChapters={genesisPassage}
				readingInformation={{
					bookId: BookId.Genesis,
					chapters: { first: 1, last: 3 },
				}}
			/>
		);
	});

	it("should display the book title for the passage", () => {
		const bookTitle = screen.queryByTestId("title");

		expect(bookTitle).toHaveTextContent(Book.Genesis);
	});

	it("should display headings in the passage", () => {
		const passageHeading = screen.queryByText("The Creation");

		expect(passageHeading).toBeInTheDocument();
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
