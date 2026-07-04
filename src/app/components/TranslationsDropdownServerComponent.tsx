import { fetchAvailableTranslations } from "@/app/utils";
import { TranslationsDropdown } from "./TranslationsDropdown";
import { Translation } from "@/app/interfaces";
import { translastionsBlackList } from "@/app/constants";

export const TranslationsDropdownServerComponent = async () => {
	const availableTranslations = await fetchAvailableTranslations();
	const esvTranslation = {
		id: "eng_esv",
		languageEnglishName: "English",
		name: "English Standard Version (ESV)",
	} as Translation;

	availableTranslations.translations.push(esvTranslation);
	const filteredTranslations = availableTranslations.translations.filter(
		(translation) => !translastionsBlackList.has(translation.id),
	);

	return <TranslationsDropdown translations={filteredTranslations} />;
};
