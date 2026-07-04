"use client";

import React, { useContext, useEffect } from "react";
import {
	SelectionsContext,
	SelectionsDispatch,
	SelectionsDispatchContext,
} from "@/app/contexts";
import { Selections, Translation } from "@/app/interfaces";
import { Languages } from "@/app/enums";

interface TranslationDropdownProps {
	translations: Translation[];
}

const setDefaultTranslationId = (
	translations: Translation[],
	selections: Selections,
	dispatch: SelectionsDispatch,
): void => {
	const defaultTranslation =
		translations.find(
			(translation) =>
				translation.id === "eng_esv" &&
				translation.languageEnglishName === selections.languageName,
		) ??
		translations.find(
			(translation) =>
				translation.languageEnglishName === selections.languageName,
		);
	const translationId = defaultTranslation?.id ?? "";
	dispatch({
		type: "SET_TRANSLATION",
		payload: translationId,
	});
	localStorage.setItem("translation", translationId);
};

export const TranslationsDropdown: React.FC<TranslationDropdownProps> = ({
	translations,
}) => {
	const selections = useContext(SelectionsContext);
	const dispatchSelections = useContext(SelectionsDispatchContext);

	useEffect(() => {
		const storedTranslationId = localStorage.getItem("translation");

		let storedSelectedLanguage = localStorage.getItem("language");
		// if storedSelectedLanguage and !storedTranslationId, then clear???
		if (
			storedSelectedLanguage &&
			storedSelectedLanguage !== selections.languageName &&
			storedTranslationId &&
			storedTranslationId !== selections.translationId
		) {
			dispatchSelections({
				type: "SET_SELECTIONS",
				payload: {
					languageName: storedSelectedLanguage,
					translationId: storedTranslationId,
				},
			});
		} else if (!storedSelectedLanguage) {
			storedSelectedLanguage = Languages.English;
			dispatchSelections({
				type: "SET_LANGUAGE",
				payload: storedSelectedLanguage as Languages,
			});
			localStorage.setItem("language", storedSelectedLanguage);
			// Occurs when translations aren't available yet
		} else if (
			storedSelectedLanguage &&
			storedSelectedLanguage === selections.languageName &&
			!storedTranslationId &&
			translations.length
		) {
			setDefaultTranslationId(translations, selections, dispatchSelections);
		}
	}, [dispatchSelections, selections, translations]);

	const handleTranslationChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const selectedTranslationId = event.target.selectedOptions[0].value;
		localStorage.setItem("translation", selectedTranslationId);
		dispatchSelections({
			type: "SET_TRANSLATION",
			payload: selectedTranslationId,
		});
	};

	return (
		<select
			id="translation-dropdown"
			onChange={handleTranslationChange}
			value={selections.translationId}
			className="bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full"
		>
			{translations
				.filter(
					(translation) =>
						translation.languageEnglishName === selections.languageName,
				)
				.sort((a, b) => (a.name < b.name ? -1 : 1))
				.map((translation) => (
					<option key={translation.id} value={translation.id}>
						{translation.name}
					</option>
				))}
		</select>
	);
};
