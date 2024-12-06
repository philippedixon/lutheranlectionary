"use client";

import { useContext, useEffect } from "react";
import {
	SelectionsContext,
	SelectionsDispatchContext,
	TranslationsContext,
	TranslationsDispatchContext,
} from "@/app/contexts";
import { languages } from "@/app/constants";
import { Translation } from "@/app/interfaces";
import { Languages } from "@/app/enums";

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
				type: "SET_TRANSLATIONS",
				payload: availableTranslations.translations as Translation[],
			});
		};

		getAvailableTranslations();
	}, [dispatchTranslations]);

	useEffect(() => {
		let selectedLanguage = localStorage.getItem("language");

		if (!selectedLanguage) {
			selectedLanguage = Languages.English;
			dispatchSelections({
				type: "SET_LANGUAGE",
				payload: selectedLanguage as Languages,
			});
			localStorage.setItem("language", selectedLanguage);
		} else if (selectedLanguage !== selections.languageName) {
			selectedLanguage = selections.languageName as string;
			dispatchSelections({
				type: "SET_LANGUAGE",
				payload: selectedLanguage as Languages,
			});
			localStorage.setItem("language", selectedLanguage);
		}
	}, [dispatchSelections, selections]);

	const handleLanguageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedLanguage = event.target.selectedOptions[0].value;
		localStorage.setItem("language", selectedLanguage);
		dispatchSelections({
			type: "SET_LANGUAGE",
			payload: selectedLanguage as Languages,
		});
	};

	return (
		<div>
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
				<select>
					{translations
						.filter(
							(translation) =>
								translation.languageName === selections.languageName
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
