import React from "react";
import { render, screen } from "@testing-library/react";
import { EsvPassage } from "@/app/components/EsvPassage";
import { BookId } from "@/app/enums";
import type { Reading } from "@/app/interfaces";
import { esvHtmlPassage } from "../../__mocks__/esv-api";

const reading: Reading = {
	bookId: BookId.John,
	chapters: { first: 11, last: 11 },
	verses: { first: 35, last: 35 },
};

describe("EsvPassage", () => {
	it("renders the reading title", () => {
		render(<EsvPassage html={esvHtmlPassage} readingInformation={reading} />);
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
			"John 11:35"
		);
	});

	it("renders the passage HTML inside the esv-passage wrapper", () => {
		const { container } = render(
			<EsvPassage html={esvHtmlPassage} readingInformation={reading} />
		);
		const wrapper = container.querySelector(".esv-passage");
		expect(wrapper).not.toBeNull();
		expect(wrapper?.innerHTML).toContain("Jesus wept");
	});

	it("renders a verse-num element inside the passage", () => {
		const { container } = render(
			<EsvPassage html={esvHtmlPassage} readingInformation={reading} />
		);
		expect(container.querySelector(".verse-num")).not.toBeNull();
	});

	it("renders the copyright link", () => {
		render(<EsvPassage html={esvHtmlPassage} readingInformation={reading} />);
		expect(screen.getByRole("link", { name: /esv/i })).toBeInTheDocument();
	});

	it("renders empty passage without crashing", () => {
		render(<EsvPassage html="" readingInformation={reading} />);
		expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
	});
});
