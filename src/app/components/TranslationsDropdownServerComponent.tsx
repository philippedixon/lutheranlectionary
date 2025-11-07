import { fetchAvailableTranslations } from "@/app/utils";
import { TranslationsDropdown } from "./TranslationsDropdown";

export const TranslationsDropdownServerComponent = async () => {
	const availableTranslations = await fetchAvailableTranslations();

	return (
		<TranslationsDropdown translations={availableTranslations.translations} />
	);
};
