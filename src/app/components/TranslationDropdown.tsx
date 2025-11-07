"use client";

import React, { useContext, useEffect } from "react";
import {
	SelectionsContext,
	SelectionsDispatch,
	SelectionsDispatchContext,
	TranslationsContext,
} from "@/app/contexts";
import { translastionsBlackList } from "@/app/constants";
import { Selections, Translation } from "@/app/interfaces";
import { Languages } from "@/app/enums";

const setDefaultTranslationId = (
	translations: Translation[],
	selections: Selections,
	dispatch: SelectionsDispatch
): void => {
	const defaultTranslation = translations.find(
		(translation) => translation.languageEnglishName === selections.languageName
	);
	const translationId = defaultTranslation?.id ?? "";
	dispatch({
		type: "SET_TRANSLATION",
		payload: translationId,
	});
	localStorage.setItem("translation", translationId);
};

export const TranslationDropdown = () => {
	const selections = useContext(SelectionsContext);
	const dispatchSelections = useContext(SelectionsDispatchContext);
	const translations = useContext(TranslationsContext);

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
		even: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedTranslationId = even.target.selectedOptions[0].value;
		localStorage.setItem("translation", selectedTranslationId);
		dispatchSelections({
			type: "SET_TRANSLATION",
			payload: selectedTranslationId,
		});
	};

	return (
		<select onChange={handleTranslationChange} value={selections.translationId}>
			{translations
				.filter(
					(translation) =>
						translation.languageEnglishName === selections.languageName
				)
				.filter((translation) => !translastionsBlackList.has(translation.id))
				.map((translation) => (
					<option key={translation.id} value={translation.id}>
						{translation.name}
					</option>
				))}
		</select>
	);
};
