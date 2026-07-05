import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OptionsPanel } from "@/app/components";
import { SelectionsProvider, ThemeProvider } from "@/app/contexts";
import { Translation } from "@/app/interfaces";

const mockTranslations: Translation[] = [
	{
		id: "eng_esv",
		languageEnglishName: "English",
		name: "English Standard Version",
	} as Translation,
	{
		id: "BSB",
		languageEnglishName: "English",
		name: "Berean Study Bible",
	} as Translation,
	{
		id: "spa_rvr",
		languageEnglishName: "Spanish",
		name: "Reina Valera",
	} as Translation,
];

const renderPanel = (
	isOpen = true,
	onClose = jest.fn(),
	translations = mockTranslations
) =>
	render(
		<SelectionsProvider>
			<ThemeProvider>
				<OptionsPanel
					isOpen={isOpen}
					onClose={onClose}
					translations={translations}
				/>
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

describe("OptionsPanel", () => {
	describe("visibility", () => {
		it("hides panel off-screen when closed", () => {
			renderPanel(false);
			expect(screen.getByTestId("options-panel")).toHaveClass("translate-x-full");
		});

		it("shows panel when open", () => {
			renderPanel(true);
			expect(screen.getByText("Reading Options")).toBeInTheDocument();
			expect(screen.getByTestId("options-panel")).not.toHaveClass("translate-x-full");
		});
	});

	describe("close interactions", () => {
		it("calls onClose when × button is clicked", async () => {
			const onClose = jest.fn();
			renderPanel(true, onClose);
			await userEvent.click(screen.getByLabelText("Close options"));
			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it("calls onClose when scrim is clicked", async () => {
			const onClose = jest.fn();
			renderPanel(true, onClose);
			await userEvent.click(screen.getByTestId("options-scrim"));
			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it("calls onClose when Escape key is pressed", async () => {
			const onClose = jest.fn();
			renderPanel(true, onClose);
			await userEvent.keyboard("{Escape}");
			expect(onClose).toHaveBeenCalledTimes(1);
		});
	});

	describe("language section", () => {
		it("renders LANGUAGE label", () => {
			renderPanel();
			expect(screen.getByText("LANGUAGE")).toBeInTheDocument();
		});

		it("renders all 7 language options as buttons", () => {
			renderPanel();
			["Dutch", "English", "French", "German", "Polish", "Spanish", "Swedish"].forEach(
				(lang) => expect(screen.getByRole("button", { name: lang })).toBeInTheDocument()
			);
		});

		it("marks the active language with aria-pressed true", async () => {
			localStorage.setItem("language", "Spanish");
			localStorage.setItem("translation", "spa_rvr");
			renderPanel();
			await waitFor(() =>
				expect(screen.getByRole("button", { name: "Spanish" })).toHaveAttribute(
					"aria-pressed",
					"true"
				)
			);
		});

		it("dispatches SET_LANGUAGE and sets default translation for new language on click", async () => {
			localStorage.setItem("language", "English");
			localStorage.setItem("translation", "eng_esv");
			renderPanel();
			await waitFor(() =>
				expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
					"aria-pressed",
					"true"
				)
			);
			await userEvent.click(screen.getByRole("button", { name: "Spanish" }));
			await waitFor(() =>
				expect(screen.getByRole("button", { name: "Spanish" })).toHaveAttribute(
					"aria-pressed",
					"true"
				)
			);
			expect(localStorage.getItem("language")).toBe("Spanish");
			expect(localStorage.getItem("translation")).toBe("spa_rvr");
		});
	});

	describe("translation section", () => {
		it("renders TRANSLATION label", () => {
			renderPanel();
			expect(screen.getByText("TRANSLATION")).toBeInTheDocument();
		});

		it("only shows translations for the current language", async () => {
			localStorage.setItem("language", "English");
			localStorage.setItem("translation", "eng_esv");
			renderPanel();
			await waitFor(() =>
				expect(
					screen.getByRole("button", { name: "English Standard Version" })
				).toBeInTheDocument()
			);
			expect(
				screen.getByRole("button", { name: "Berean Study Bible" })
			).toBeInTheDocument();
			expect(
				screen.queryByRole("button", { name: "Reina Valera" })
			).not.toBeInTheDocument();
		});

		it("shows translations sorted alphabetically", async () => {
			localStorage.setItem("language", "English");
			localStorage.setItem("translation", "eng_esv");
			renderPanel();
			await waitFor(() =>
				expect(screen.getAllByTestId(/^translation-row-/)).toHaveLength(2)
			);
			const rows = screen.getAllByTestId(/^translation-row-/);
			expect(rows[0]).toHaveTextContent("Berean Study Bible");
			expect(rows[1]).toHaveTextContent("English Standard Version");
		});

		it("marks the active translation with aria-pressed true", async () => {
			localStorage.setItem("language", "English");
			localStorage.setItem("translation", "eng_esv");
			renderPanel();
			await waitFor(() =>
				expect(
					screen.getByRole("button", { name: "English Standard Version" })
				).toHaveAttribute("aria-pressed", "true")
			);
		});

		it("dispatches SET_TRANSLATION and updates localStorage on click", async () => {
			localStorage.setItem("language", "English");
			localStorage.setItem("translation", "eng_esv");
			renderPanel();
			await waitFor(() =>
				expect(screen.getByRole("button", { name: "Berean Study Bible" })).toBeInTheDocument()
			);
			await userEvent.click(screen.getByRole("button", { name: "Berean Study Bible" }));
			await waitFor(() =>
				expect(
					screen.getByRole("button", { name: "Berean Study Bible" })
				).toHaveAttribute("aria-pressed", "true")
			);
			expect(localStorage.getItem("translation")).toBe("BSB");
		});
	});

	describe("localStorage sync on mount", () => {
		it("restores stored language and translation", async () => {
			localStorage.setItem("language", "Spanish");
			localStorage.setItem("translation", "spa_rvr");
			renderPanel();
			await waitFor(() =>
				expect(screen.getByRole("button", { name: "Spanish" })).toHaveAttribute(
					"aria-pressed",
					"true"
				)
			);
		});

		it("defaults to English when no language is stored", async () => {
			renderPanel();
			await waitFor(() =>
				expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
					"aria-pressed",
					"true"
				)
			);
			expect(localStorage.getItem("language")).toBe("English");
		});

		it("sets default translation (ESV) when language matches but translation is empty", async () => {
			renderPanel();
			await waitFor(() =>
				expect(
					screen.getByRole("button", { name: "English Standard Version" })
				).toHaveAttribute("aria-pressed", "true")
			);
		});
	});

	describe("scroll and body lock", () => {
		afterEach(() => {
			document.body.style.overflow = "";
		});

		it("panel aside has overflow-y-auto to allow independent scrolling", () => {
			renderPanel(true);
			expect(screen.getByTestId("options-panel")).toHaveClass("overflow-y-auto");
		});

		it("locks body scroll when panel is open", () => {
			renderPanel(true);
			expect(document.body.style.overflow).toBe("hidden");
		});

		it("restores body scroll when panel closes", () => {
			const { rerender } = render(
				<SelectionsProvider>
					<ThemeProvider>
						<OptionsPanel isOpen={true} onClose={jest.fn()} translations={mockTranslations} />
					</ThemeProvider>
				</SelectionsProvider>
			);
			expect(document.body.style.overflow).toBe("hidden");
			rerender(
				<SelectionsProvider>
					<ThemeProvider>
						<OptionsPanel isOpen={false} onClose={jest.fn()} translations={mockTranslations} />
					</ThemeProvider>
				</SelectionsProvider>
			);
			expect(document.body.style.overflow).toBe("");
		});
	});

	describe("active row styling", () => {
		it("active language row has text-primary class", async () => {
			localStorage.setItem("language", "English");
			localStorage.setItem("translation", "eng_esv");
			renderPanel();
			await waitFor(() =>
				expect(screen.getByRole("button", { name: "English" })).toHaveClass("text-primary")
			);
		});

		it("inactive language rows do not have text-primary class", async () => {
			localStorage.setItem("language", "English");
			localStorage.setItem("translation", "eng_esv");
			renderPanel();
			await waitFor(() =>
				expect(screen.getByRole("button", { name: "English" })).toHaveClass("text-primary")
			);
			expect(screen.getByRole("button", { name: "Dutch" })).not.toHaveClass("text-primary");
		});

		it("active translation row has text-primary class", async () => {
			localStorage.setItem("language", "English");
			localStorage.setItem("translation", "eng_esv");
			renderPanel();
			await waitFor(() =>
				expect(
					screen.getByRole("button", { name: "English Standard Version" })
				).toHaveClass("text-primary")
			);
		});
	});
});
