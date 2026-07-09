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
			fetchData: jest
				.fn()
				.mockResolvedValue([
					{ book: { id: "b" }, chapter: { number: 1, content: [] } },
				]),
		}),
	})),
}));

jest.mock("@/app/components", () => {
	const actual = jest.requireActual("@/app/components");
	const { getReadingTitle } = jest.requireActual("@/app/utils");
	const PassageStub = ({
		readingInformation,
	}: {
		readingInformation: unknown;
	}) =>
		React.createElement("div", {
			"data-testid": `passage-${getReadingTitle(readingInformation)}`,
		});
	return {
		...actual,
		ReadingPassage: PassageStub,
		VersePassage: PassageStub,
		EsvPassage: PassageStub,
	};
});

beforeEach(() => {
	mockPathname.mockReturnValue("/1/4");
});

describe("DayPage reading tabs", () => {
	it("renders one tab per reading for the day", async () => {
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-Psalms 32")).toBeInTheDocument()
		);
		const tabs = screen.getAllByRole("button");
		expect(tabs).toHaveLength(2);
		expect(tabs[0]).toHaveTextContent("Psalms 32");
		expect(tabs[1]).toHaveTextContent("Mark 5");
	});

	it("shows only the first reading's passage by default", async () => {
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-Psalms 32")).toBeInTheDocument()
		);
		expect(screen.queryByTestId("passage-Mark 5")).not.toBeInTheDocument();
	});

	it("swaps to a reading's passage when its tab is clicked", async () => {
		render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-Psalms 32")).toBeInTheDocument()
		);
		await userEvent.click(screen.getByRole("button", { name: "Mark 5" }));

		expect(screen.getByTestId("passage-Mark 5")).toBeInTheDocument();
		expect(screen.queryByTestId("passage-Psalms 32")).not.toBeInTheDocument();
	});

	it("resets to the first tab when navigating to a new day", async () => {
		const { rerender } = render(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-Psalms 32")).toBeInTheDocument()
		);
		await userEvent.click(screen.getByRole("button", { name: "Mark 5" }));
		expect(screen.getByTestId("passage-Mark 5")).toBeInTheDocument();

		mockPathname.mockReturnValue("/1/5");
		rerender(<DayPage />);

		await waitFor(() =>
			expect(screen.getByTestId("passage-Psalms 33")).toBeInTheDocument()
		);
		expect(screen.queryByTestId("passage-Mark 6")).not.toBeInTheDocument();
	});
});
