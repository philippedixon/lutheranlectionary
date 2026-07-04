import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "@/app/contexts";

const TestConsumer = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div>
			<span data-testid="theme">{theme}</span>
			<button onClick={toggleTheme}>toggle</button>
		</div>
	);
};

const renderWithProvider = () =>
	render(
		<ThemeProvider>
			<TestConsumer />
		</ThemeProvider>
	);

beforeEach(() => {
	localStorage.clear();
	document.documentElement.classList.remove("dark");
	window.matchMedia = jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
	}));
});

describe("ThemeProvider", () => {
	it("defaults to light when no localStorage value and no system preference", () => {
		renderWithProvider();
		expect(screen.getByTestId("theme")).toHaveTextContent("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	it("applies dark class when localStorage is 'dark'", () => {
		localStorage.setItem("theme", "dark");
		renderWithProvider();
		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(screen.getByTestId("theme")).toHaveTextContent("dark");
	});

	it("does not apply dark class when localStorage is 'light'", () => {
		localStorage.setItem("theme", "light");
		renderWithProvider();
		expect(document.documentElement.classList.contains("dark")).toBe(false);
		expect(screen.getByTestId("theme")).toHaveTextContent("light");
	});

	it("toggleTheme switches from light to dark and persists to localStorage", async () => {
		localStorage.setItem("theme", "light");
		renderWithProvider();

		await userEvent.click(screen.getByRole("button", { name: "toggle" }));

		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(localStorage.getItem("theme")).toBe("dark");
		expect(screen.getByTestId("theme")).toHaveTextContent("dark");
	});

	it("toggleTheme switches from dark to light and persists to localStorage", async () => {
		localStorage.setItem("theme", "dark");
		renderWithProvider();

		await userEvent.click(screen.getByRole("button", { name: "toggle" }));

		expect(document.documentElement.classList.contains("dark")).toBe(false);
		expect(localStorage.getItem("theme")).toBe("light");
		expect(screen.getByTestId("theme")).toHaveTextContent("light");
	});
});
