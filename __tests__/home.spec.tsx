import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

describe("Home", () => {
	it("should render the heading", () => {
		render(<Home />);

		const heading = screen.queryByText("Lutheran Lectionary");

		expect(heading).toBeInTheDocument();
	});
});
