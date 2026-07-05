import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../src/app/page";

describe("Home", () => {
	it("should display the heading", () => {
		render(<Home />);
		expect(screen.queryByText("Lutheran Lectionary")).toBeInTheDocument();
	});

	it("should display readings for a given month", async () => {
		render(<Home />);
		await userEvent.click(screen.getByRole("button", { name: "December" }));
		expect(screen.getByTestId("monthId-12")).toBeInTheDocument();
		expect(screen.getByTestId("date:December-2")).toHaveTextContent("2");
		expect(screen.getByTestId("reading1:December-2")).toHaveTextContent("Psalms 1");
		expect(screen.getByTestId("reading2:December-2")).toHaveTextContent("Revelation 3-5");
	});

	it("should display verses for readings that include only parts of a chapter", async () => {
		render(<Home />);
		await userEvent.click(screen.getByRole("button", { name: "December" }));
		expect(screen.getByTestId("reading1:December-1")).toHaveTextContent("Luke 1:46-55");
	});

	it("should display only the book title when all chapters are included in the reading", async () => {
		render(<Home />);
		await userEvent.click(screen.getByRole("button", { name: "November" }));
		expect(screen.getByTestId("reading2:November-3")).toHaveTextContent("Joel");
	});

	it("should comma-separate books when there are multiple books in a reading", async () => {
		render(<Home />);
		await userEvent.click(screen.getByRole("button", { name: "May" }));
		expect(screen.getByTestId("reading2:May-1")).toHaveTextContent("Titus, Philemon");
	});

	it("should style day links with primary color class", async () => {
		render(<Home />);
		await userEvent.click(screen.getByRole("button", { name: "December" }));
		const dayLink = screen.getByTestId("date:December-2").closest("a");
		expect(dayLink).toHaveClass("text-primary");
	});
});
