import React from "react";
import { render, screen } from "@testing-library/react";
import { EsvPassage } from "@/app/components/EsvPassage";
import { SelectionsContext } from "@/app/contexts";
import { Selections } from "@/app/interfaces";
import { esvHtmlPassage } from "../../__mocks__/esv-api";

const renderWithSelections = (selections: Selections) =>
	render(
		<SelectionsContext.Provider value={selections}>
			<EsvPassage html={esvHtmlPassage} />
		</SelectionsContext.Provider>
	);

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

	describe("reading font and text size", () => {
		it("has no font/size variant classes by default", () => {
			const { container } = render(<EsvPassage html={esvHtmlPassage} />);
			const wrapper = container.querySelector(".esv-passage");
			expect(wrapper).not.toHaveClass("font-serif4");
			expect(wrapper).not.toHaveClass("size-small");
			expect(wrapper).not.toHaveClass("size-large");
		});

		it("applies font-serif4 when Source Serif 4 is selected", () => {
			const { container } = renderWithSelections({ bodyFont: "serif4" });
			expect(container.querySelector(".esv-passage")).toHaveClass("font-serif4");
		});

		it("applies size-small when small text size is selected", () => {
			const { container } = renderWithSelections({ fontSize: "small" });
			expect(container.querySelector(".esv-passage")).toHaveClass("size-small");
		});

		it("applies size-large when large text size is selected", () => {
			const { container } = renderWithSelections({ fontSize: "large" });
			expect(container.querySelector(".esv-passage")).toHaveClass("size-large");
		});
	});
});
