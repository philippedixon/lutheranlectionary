import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

describe("Home", () => {
	beforeEach(() => {
		render(<Home />);
	});

	it("should display the heading", () => {
		const heading = screen.queryByText("Lutheran Lectionary");

		expect(heading).toBeInTheDocument();
	});

	it("should display readings for a given month", () => {
		const month = screen.queryByText("December");
		const date = screen.getByTestId("date:December-2");
		const reading1Display = screen.getByTestId("reading1:December-2");
		const reading2Display = screen.getByTestId("reading2:December-2");

		expect(month).toBeInTheDocument();
		expect(date).toHaveTextContent("2");
		expect(reading1Display).toHaveTextContent("Psalms 1");
		expect(reading2Display).toHaveTextContent("Revelation 3-5");
	});

	it("should display verses for readings that include only parts of a chapter", () => {
		const readingWithVersesDisplay = screen.getByTestId("reading1:December-1");

		expect(readingWithVersesDisplay).toHaveTextContent("Luke 1:46-55");
	});

	it("should display only the book title when all chapters are included in the reading", () => {
		const readingWithEntireBookDisplay = screen.getByTestId(
			"reading2:November-3"
		);

		expect(readingWithEntireBookDisplay).toHaveTextContent("Joel");
	});

	it("should comma-separate books when there are multiple books in a reading", () => {
		const readingWithMultipleBooks = screen.getByTestId("reading2:May-1");

		expect(readingWithMultipleBooks).toHaveTextContent("Titus, Philemon");
	});
});
