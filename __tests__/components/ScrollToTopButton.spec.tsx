import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScrollToTopButton } from "@/app/components";

describe("ScrollToTopButton", () => {
	it("renders an inline caret SVG mark", () => {
		render(<ScrollToTopButton />);
		const svg = screen.getByTestId("scroll-to-top-icon");
		expect(svg.tagName).toBe("svg");
		expect(svg).toHaveAttribute("viewBox");
	});

	it("scrolls the #top element into view on click", async () => {
		document.body.innerHTML = '<div id="top"></div>';
		const scrollIntoView = jest.fn();
		document.getElementById("top")!.scrollIntoView = scrollIntoView;
		const replaceState = jest.spyOn(history, "replaceState");

		render(<ScrollToTopButton />);
		await userEvent.click(screen.getByLabelText("Scroll to top"));

		expect(scrollIntoView).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "start",
		});
		expect(replaceState).toHaveBeenCalledWith(null, "", "#top");

		replaceState.mockRestore();
	});
});
