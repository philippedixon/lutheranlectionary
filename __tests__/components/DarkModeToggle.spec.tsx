import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DarkModeToggle } from "@/app/components";
import { ThemeProvider } from "@/app/contexts";

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

const renderWithProvider = (localStorageTheme?: string) => {
	if (localStorageTheme) localStorage.setItem("theme", localStorageTheme);
	return render(
		<ThemeProvider>
			<DarkModeToggle />
		</ThemeProvider>
	);
};

describe("DarkModeToggle", () => {
	it("renders Moon icon in light mode", () => {
		renderWithProvider("light");
		expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
	});

	it("renders Sun icon in dark mode", () => {
		renderWithProvider("dark");
		expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
	});

	it("clicking toggle switches from light to dark", async () => {
		renderWithProvider("light");
		await userEvent.click(screen.getByRole("button"));
		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
	});

	it("clicking toggle switches from dark to light", async () => {
		renderWithProvider("dark");
		await userEvent.click(screen.getByRole("button"));
		expect(document.documentElement.classList.contains("dark")).toBe(false);
		expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
	});
});
