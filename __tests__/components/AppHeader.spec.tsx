import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppHeader } from "@/app/components";
import { SelectionsProvider, ThemeProvider } from "@/app/contexts";
import { Translation } from "@/app/interfaces";

const mockTranslations: Translation[] = [
	{
		id: "eng_esv",
		languageEnglishName: "English",
		name: "English Standard Version",
	} as Translation,
];

const renderHeader = (translations = mockTranslations) =>
	render(
		<SelectionsProvider>
			<ThemeProvider>
				<AppHeader translations={translations} />
			</ThemeProvider>
		</SelectionsProvider>
	);

beforeEach(() => {
	localStorage.clear();
	window.matchMedia = jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
	}));
});

describe("AppHeader", () => {
	it("renders a home link pointing to /", () => {
		renderHeader();
		expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
	});

	it("renders an inline home SVG icon inside the home link", () => {
		renderHeader();
		const svg = screen.getByTestId("home-icon");
		expect(svg.tagName).toBe("svg");
		expect(svg).toHaveAttribute("viewBox");
	});

	it("renders the options button", () => {
		renderHeader();
		expect(screen.getByRole("button", { name: "Reading options" })).toBeInTheDocument();
	});

	it("renders an inline options SVG icon inside the options button", () => {
		renderHeader();
		const svg = screen.getByTestId("options-icon");
		expect(svg.tagName).toBe("svg");
		expect(svg).toHaveAttribute("viewBox");
	});

	it("renders the dark mode toggle", () => {
		renderHeader();
		expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
	});

	it("panel is closed by default", () => {
		renderHeader();
		expect(screen.getByTestId("options-panel")).toHaveClass("translate-x-full");
	});

	it("opens the options panel when the options button is clicked", async () => {
		renderHeader();
		await userEvent.click(screen.getByRole("button", { name: "Reading options" }));
		expect(screen.getByTestId("options-panel")).not.toHaveClass("translate-x-full");
	});

	it("closes the panel when the close button inside the panel is clicked", async () => {
		renderHeader();
		await userEvent.click(screen.getByRole("button", { name: "Reading options" }));
		await userEvent.click(screen.getByLabelText("Close options"));
		expect(screen.getByTestId("options-panel")).toHaveClass("translate-x-full");
	});
});
