import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TranslationsDropdown } from "@/app/components";
import { SelectionsProvider } from "@/app/contexts";
import { Translation } from "@/app/interfaces";

describe("TranslationsDropdown", () => {
	beforeEach(() => {
		render(
			<SelectionsProvider>
				<TranslationsDropdown
					translations={
						[
							{
								id: "BSB",
								languageEnglishName: "English",
								name: "Berean Study Bible",
							},
							{
								id: "eng_fbv",
								languageEnglishName: "English",
								name: "Free Bible Version",
							},
						] as Translation[]
					}
				/>
			</SelectionsProvider>
		);
	});

	it("should have render available translation options", async () => {
		const dropdown = screen.getByRole("combobox");
		const options = screen.getAllByRole("option");

		expect(dropdown).toBeInTheDocument();
		expect(options).toHaveLength(2);
		expect(options[0]).toHaveTextContent("Berean Study Bible");
		expect(options[1]).toHaveTextContent("Free Bible Version");
	});

	it("should have the correct default selection", async () => {
		const dropdown = screen.getByRole("combobox") as HTMLSelectElement;
		expect(dropdown.value).toBe("BSB");
	});

	it("should update selection on change", async () => {
		const dropdown = screen.getByRole("combobox") as HTMLSelectElement;

		await userEvent.selectOptions(
			dropdown,
			screen.getByRole("option", { name: "Free Bible Version" })
		);

		expect(dropdown.value).toBe("eng_fbv");
	});
});
