import { fetchAvailableTranslations } from "@/app/utils";
import { Translation } from "@/app/interfaces";
import { translastionsBlackList } from "@/app/constants";
import { AppHeader } from "./AppHeader";

export const AppHeaderServer = async () => {
	const availableTranslations = await fetchAvailableTranslations();
	const esvTranslation = {
		id: "eng_esv",
		languageEnglishName: "English",
		name: "English Standard Version (ESV)",
	} as Translation;

	availableTranslations.translations.push(esvTranslation);
	const filteredTranslations = availableTranslations.translations.filter(
		(translation) => !translastionsBlackList.has(translation.id)
	);

	return <AppHeader translations={filteredTranslations} />;
};
