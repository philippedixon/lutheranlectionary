import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReadingTabs } from "@/app/components";
import { BookId } from "@/app/enums";
import { Reading } from "@/app/interfaces";
import { getReadingTitle } from "@/app/utils";

const readings: Reading[] = [
	{ bookId: BookId.Psalms, chapters: { first: 32, last: 32 } },
	{ bookId: BookId.Mark, chapters: { first: 2, last: 2 } },
];

describe("ReadingTabs", () => {
	it("renders one tab per reading, labelled by its scripture reference", () => {
		render(
			<ReadingTabs readings={readings} activeIndex={0} onSelect={jest.fn()} />
		);

		const tabs = screen.getAllByRole("button");
		expect(tabs).toHaveLength(2);
		expect(tabs[0]).toHaveTextContent(getReadingTitle(readings[0]));
		expect(tabs[1]).toHaveTextContent(getReadingTitle(readings[1]));
	});

	it("marks the active tab and leaves the others inactive", () => {
		render(
			<ReadingTabs readings={readings} activeIndex={1} onSelect={jest.fn()} />
		);

		const tabs = screen.getAllByRole("button");
		expect(tabs[1]).toHaveClass("text-primary");
		expect(tabs[0]).toHaveClass("text-gold");
		expect(tabs[0]).not.toHaveClass("text-primary");
	});

	it("calls onSelect with the tab index when a tab is clicked", async () => {
		const onSelect = jest.fn();
		render(
			<ReadingTabs readings={readings} activeIndex={0} onSelect={onSelect} />
		);

		await userEvent.click(screen.getAllByRole("button")[1]);

		expect(onSelect).toHaveBeenCalledWith(1);
	});
});
