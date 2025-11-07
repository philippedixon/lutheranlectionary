import { TranslationDropdown } from "@/app/components";
import { SelectionsProvider, TranslationsProvider } from "@/app/contexts";
import { render } from "@testing-library/react";

describe("TranslationDropdown", () => {
	beforeEach(() => {
		render(
			<SelectionsProvider>
				<TranslationsProvider>
					<TranslationDropdown />
				</TranslationsProvider>
			</SelectionsProvider>
		);
	});

	it("should show available translations", async () => {});
});
