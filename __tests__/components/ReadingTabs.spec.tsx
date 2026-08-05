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

	it("marks the active tab bold and primary-colored, leaving others regular-weight gold", () => {
		render(
			<ReadingTabs readings={readings} activeIndex={1} onSelect={jest.fn()} />
		);

		const tabs = screen.getAllByRole("button");
		expect(tabs[1]).toHaveTextContent(getReadingTitle(readings[1]));
		const activeLabel = screen.getByTestId("reading-tab-label-1");
		const inactiveLabel = screen.getByTestId("reading-tab-label-0");

		expect(activeLabel).toHaveClass("font-semibold", "text-primary");
		expect(inactiveLabel).not.toHaveClass("font-semibold");
		expect(inactiveLabel).toHaveClass("text-gold");
		expect(inactiveLabel).not.toHaveClass("text-primary");
	});

	it("gives only the active tab a visible primary underline", () => {
		render(
			<ReadingTabs readings={readings} activeIndex={1} onSelect={jest.fn()} />
		);

		const activeUnderline = screen.getByTestId("reading-tab-underline-1");
		const inactiveUnderline = screen.getByTestId("reading-tab-underline-0");

		expect(activeUnderline).toHaveClass("bg-primary");
		expect(inactiveUnderline).not.toHaveClass("bg-primary");
	});

	it("gives each tab label the app-wide scale class so Text Size affects tabs too", () => {
		render(
			<ReadingTabs readings={readings} activeIndex={0} onSelect={jest.fn()} />
		);

		expect(screen.getByTestId("reading-tab-label-0")).toHaveClass("app-text-tab");
		expect(screen.getByTestId("reading-tab-label-1")).toHaveClass("app-text-tab");
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
