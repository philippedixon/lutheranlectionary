"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import {
	SelectionsContext,
	SelectionsDispatch,
	SelectionsDispatchContext,
	TranslationsContext,
	TranslationsDispatchContext,
} from "@/app/contexts";
import { languages } from "@/app/constants";
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

const Template = ({ children }: { children: React.ReactNode }) => {
	const selections = useContext(SelectionsContext);
	const dispatchSelections = useContext(SelectionsDispatchContext);
	const translations = useContext(TranslationsContext);
	const dispatchTranslations = useContext(TranslationsDispatchContext);

	useEffect(() => {
		const getAvailableTranslations = async () => {
			const request = await fetch(
				`https://bible.helloao.org/api/available_translations.json`
			);

			const availableTranslations = await request.json();

			dispatchTranslations({
				payload: availableTranslations.translations as Translation[],
			});
		};

		getAvailableTranslations();
	}, [dispatchTranslations]);

	useEffect(() => {
		const storedTranslationId = localStorage.getItem("translation");

		let storedSelectedLanguage = localStorage.getItem("language");
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

	const handleLanguageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedLanguage = event.target.selectedOptions[0].value;
		localStorage.setItem("language", selectedLanguage);
		dispatchSelections({
			type: "SET_LANGUAGE",
			payload: selectedLanguage as Languages,
		});
		localStorage.setItem("translation", "");
	};

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
		<div>
			<nav>
				<Link href="/">Home</Link>
			</nav>
			<div>
				<select onChange={handleLanguageChange} value={selections.languageName}>
					{languages.map((language) => (
						<option key={language} value={language}>
							{language}
						</option>
					))}
				</select>
			</div>
			<div>
				<select
					onChange={handleTranslationChange}
					value={selections.translationId}
				>
					{translations
						.filter(
							(translation) =>
								translation.languageEnglishName === selections.languageName
						)
						.map((translation) => (
							<option key={translation.id} value={translation.id}>
								{translation.name}
							</option>
						))}
				</select>
			</div>
			{children}
		</div>
	);
};

export default Template;
