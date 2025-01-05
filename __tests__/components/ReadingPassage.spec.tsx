import { render, screen } from "@testing-library/react";
import { ReadingPassage } from "@/app/components";
import { genesisPassage } from "../../__mocks__/helloao-api";
import { Book, BookId } from "@/app/enums";

describe("ReadingPassage", () => {
	beforeEach(() => {
		render(<ReadingPassage passage={genesisPassage} title={Book.Genesis} />);
	});

	it("should display the book title for the passage", () => {
		const bookTitle = screen.queryByText(Book.Genesis);

		expect(bookTitle).toBeInTheDocument();
	});

	it("should display headings in the passage", () => {
		const passageHeading = screen.queryByText("The Creation");

		expect(passageHeading).toBeInTheDocument();
	});

	it("should display the chapter number for the passage", () => {
		const chapterNumber = screen.queryByTestId(`${BookId.Genesis}:chapter:1`);

		expect(chapterNumber).toBeInTheDocument();
	});

	it("should display the passage text with verse numbers", () => {
		const firstVerseNumber = screen.queryByTestId(`${BookId.Genesis}:1:1`);
		const lastVerseNumber = screen.queryByTestId(`${BookId.Genesis}:1:31`);

		expect(firstVerseNumber).toBeInTheDocument();
		expect(lastVerseNumber).toBeInTheDocument();
	});

	it.todo("should format poem verses");

	it.todo("should format Jesus' words");
});
