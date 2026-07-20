import React from "react";
import { render, screen } from "@testing-library/react";
import { EsvPassage } from "@/app/components/EsvPassage";
import { esvHtmlPassage } from "../../__mocks__/esv-api";

describe("EsvPassage", () => {
	it("renders the passage HTML inside the esv-passage wrapper", () => {
		const { container } = render(<EsvPassage html={esvHtmlPassage} />);
		const wrapper = container.querySelector(".esv-passage");
		expect(wrapper).not.toBeNull();
		expect(wrapper?.innerHTML).toContain("Jesus wept");
	});

	it("renders a verse-num element inside the passage", () => {
		const { container } = render(<EsvPassage html={esvHtmlPassage} />);
		expect(container.querySelector(".verse-num")).not.toBeNull();
	});

	it("renders the copyright link", () => {
		render(<EsvPassage html={esvHtmlPassage} />);
		expect(screen.getByRole("link", { name: /esv/i })).toBeInTheDocument();
	});

	it("renders empty passage without crashing", () => {
		const { container } = render(<EsvPassage html="" />);
		expect(container.querySelector(".esv-passage")).not.toBeNull();
	});
});
