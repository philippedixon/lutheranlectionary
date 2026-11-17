import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PassageUnavailable } from "@/app/components";

describe("PassageUnavailable", () => {
	it("explains the passage is missing from the translation by default", () => {
		render(<PassageUnavailable />);

		expect(
			screen.getByText("Passage not available in this translation.")
		).toBeInTheDocument();
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("offers a retry when given an onRetry handler", async () => {
		const onRetry = jest.fn();
		render(<PassageUnavailable onRetry={onRetry} />);

		expect(screen.getByText("Couldn't load this passage.")).toBeInTheDocument();
		expect(
			screen.queryByText("Passage not available in this translation.")
		).not.toBeInTheDocument();

		await userEvent.click(screen.getByRole("button", { name: "Try again" }));
		expect(onRetry).toHaveBeenCalledTimes(1);
	});
});
