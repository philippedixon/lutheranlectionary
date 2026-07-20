import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DayPage from "@/app/[month]/[day]/page";

const mockPathname = jest.fn(() => "/1/4");

jest.mock("next/navigation", () => ({
	usePathname: () => mockPathname(),
}));

jest.mock("@/lib/api/ApiStrategyFactory", () => ({
	ApiStrategyFactory: jest.fn().mockImplementation(() => ({
		create: () => ({
			fetchData: jest.fn((reading: { bookId: string; chapters?: { first: number } }) =>
				Promise.resolve([
					{
						book: { id: reading.bookId },
						chapter: { number: reading.chapters?.first ?? 0, content: [] },
					},
				])
			),
		}),
	})),
}));

jest.mock("@/app/components", () => {
	const actual = jest.requireActual("@/app/components");
	const ReadingPassageStub = ({
		passageChapters,
	}: {
		passageChapters: { book: { id: string }; chapter: { number: number } }[];
	}) => {
		const { book, chapter } = passageChapters[0];
		return React.createElement("div", {
			"data-testid": `passage-${book.id}-${chapter.number}`,
		});
	};
	const VersePassageStub = ({
		passageChapter,
	}: {
		passageChapter: { book: { id: string }; chapter: { number: number } };
	}) => {
		const { book, chapter } = passageChapter;
		return React.createElement("div", {
			"data-testid": `passage-${book.id}-${chapter.number}`,
		});
	};
	return {
		...actual,
		ReadingPassage: ReadingPassageStub,
		VersePassage: VersePassageStub,
		EsvPassage: actual.EsvPassage,
	};
});

beforeEach(() => {
	mockPathname.mockReturnValue("/1/4");
});

describe("DayPage reading tabs", () => {
	it("renders one tab per reading for the day", async () => {
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-PSA-32")).toBeInTheDocument()
		);
		const tabs = screen
			.getAllByRole("button")
			.filter((button) => button.getAttribute("aria-label") !== "Scroll to top");
		expect(tabs).toHaveLength(2);
		expect(tabs[0]).toHaveTextContent("Psalms 32");
		expect(tabs[1]).toHaveTextContent("Mark 5");
	});

	it("shows only the first reading's passage by default", async () => {
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-PSA-32")).toBeInTheDocument()
		);
		expect(screen.queryByTestId("passage-MRK-5")).not.toBeInTheDocument();
	});

	it("swaps to a reading's passage when its tab is clicked", async () => {
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-PSA-32")).toBeInTheDocument()
		);
		await userEvent.click(screen.getByRole("button", { name: "Mark 5" }));

		expect(screen.getByTestId("passage-MRK-5")).toBeInTheDocument();
		expect(screen.queryByTestId("passage-PSA-32")).not.toBeInTheDocument();
	});

	it("resets to the first tab when navigating to a new day", async () => {
		const { rerender } = render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-PSA-32")).toBeInTheDocument()
		);
		await userEvent.click(screen.getByRole("button", { name: "Mark 5" }));
		expect(screen.getByTestId("passage-MRK-5")).toBeInTheDocument();

		mockPathname.mockReturnValue("/1/5");
		rerender(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-PSA-33")).toBeInTheDocument()
		);
		expect(screen.queryByTestId("passage-MRK-6")).not.toBeInTheDocument();
	});
});

describe("DayPage day navigation", () => {
	it("links Prev Day and Next Day to the adjacent dates", async () => {
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-PSA-32")).toBeInTheDocument()
		);
		expect(screen.getByRole("link", { name: /Prev Day/ })).toHaveAttribute(
			"href",
			"/1/3"
		);
		expect(screen.getByRole("link", { name: /Next Day/ })).toHaveAttribute(
			"href",
			"/1/5"
		);
	});

	it("wraps Prev Day to the previous month's last day at the start of a month", async () => {
		mockPathname.mockReturnValue("/1/1");
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByRole("link", { name: /Prev Day/ })).toHaveAttribute(
				"href",
				"/12/31"
			)
		);
	});

	it("wraps Next Day to the next month's first day at the end of a month", async () => {
		mockPathname.mockReturnValue("/1/31");
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByRole("link", { name: /Next Day/ })).toHaveAttribute(
				"href",
				"/2/1"
			)
		);
	});

	it("renders a back-to-top control between Prev and Next Day", async () => {
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument()
		);
	});
});
