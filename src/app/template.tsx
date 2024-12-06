"use client";

import { useContext, useEffect } from "react";
import { SelectionsContext, SelectionsDispatchContext } from "@/app/contexts";
import { Languages } from "@/app/enums";
import { languages } from "@/app/constants";

// const getAvailableTranslations = async () => {
// 	const request = await fetch(
// 		`https://bible.helloao.org/api/available_translations.json`
// 	);
// 	return request;
// };

const Template = ({ children }: { children: React.ReactNode }) => {
	const selections = useContext(SelectionsContext);
	const dispatchSelections = useContext(SelectionsDispatchContext);

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
			{children}
		</div>
	);
};

export default Template;
