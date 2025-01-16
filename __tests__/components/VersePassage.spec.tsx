import { render, screen } from "@testing-library/react";
import { lukeTranslationBookChapter } from "../../__mocks__/content";
import lectionary from "@/app/constants/lectionary";
import { VersePassage } from "@/app/components";

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
