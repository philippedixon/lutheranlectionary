import { render, screen, act } from "@testing-library/react";
import { useContext } from "react";
import {
	SelectionsProvider,
	SelectionsContext,
	SelectionsDispatchContext,
} from "@/app/contexts";

const TestConsumer = () => {
	const selections = useContext(SelectionsContext);
	const dispatch = useContext(SelectionsDispatchContext);
	return (
		<div>
			<span data-testid="font-size">{selections.fontSize ?? "unset"}</span>
			<button onClick={() => dispatch({ type: "SET_FONT_SIZE", payload: "large" })}>
				set large
			</button>
			<button onClick={() => dispatch({ type: "SET_FONT_SIZE", payload: "small" })}>
				set small
			</button>
		</div>
	);
};

const renderWithProvider = () =>
	render(
		<SelectionsProvider>
			<TestConsumer />
		</SelectionsProvider>
	);

beforeEach(() => {
	document.documentElement.removeAttribute("data-font-scale");
});

describe("SelectionsProvider font-scale attribute", () => {
	it("defaults document.documentElement's data-font-scale to medium before a selection is made", () => {
		renderWithProvider();
		expect(document.documentElement.dataset.fontScale).toBe("medium");
	});

	it("sets data-font-scale to large when fontSize becomes large", async () => {
		renderWithProvider();

		await act(async () => {
			screen.getByRole("button", { name: "set large" }).click();
		});

		expect(document.documentElement.dataset.fontScale).toBe("large");
	});

	it("sets data-font-scale to small when fontSize becomes small", async () => {
		renderWithProvider();

		await act(async () => {
			screen.getByRole("button", { name: "set small" }).click();
		});

		expect(document.documentElement.dataset.fontScale).toBe("small");
	});
});
