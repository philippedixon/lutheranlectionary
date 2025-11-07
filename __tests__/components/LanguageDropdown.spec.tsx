import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageDropdown } from "@/app/components";
import { SelectionsProvider } from "@/app/contexts";
import { Languages } from "@/app/enums";

describe("LanguageDropdown", () => {
	beforeEach(() => {
		render(
			<SelectionsProvider>
				<LanguageDropdown />
			</SelectionsProvider>
		);
	});

	it("should render all available language options", () => {
		const options = screen.getAllByRole("option");

		expect(options[0]).toHaveTextContent(Languages.English);
		expect(options[1]).toHaveTextContent(Languages.French);
		expect(options[2]).toHaveTextContent(Languages.German);
		expect(options[3]).toHaveTextContent(Languages.Spanish);
		expect(options[4]).toHaveTextContent(Languages.Swedish);
	});

	it("should handle language changes correctly", () => {
		const select = screen.getByRole("combobox");

		fireEvent.change(select, { target: { value: "Spanish" } });

		expect(select).toHaveValue("Spanish");
	});

	it("should set translation to empty string on language change", () => {
		const select = screen.getByRole("combobox");

		// Set initial language and translation in localStorage
		localStorage.setItem("language", "English");
		localStorage.setItem("translation", "eng_xyz");

		// Change language
		fireEvent.change(select, { target: { value: "German" } });

		// Check that translation is reset
		const storedTranslation = localStorage.getItem("translation");
		expect(storedTranslation).toBe("");
	});
});
