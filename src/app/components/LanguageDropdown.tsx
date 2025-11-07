"use client";

import { useContext } from "react";
import { languages } from "@/app/constants";
import { SelectionsContext, SelectionsDispatchContext } from "@/app/contexts";
import { Languages } from "@/app/enums";

export const LanguageDropdown = () => {
	const selections = useContext(SelectionsContext);
	const dispatchSelections = useContext(SelectionsDispatchContext);

	const handleLanguageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedLanguage = event.target.selectedOptions[0].value;
		localStorage.setItem("language", selectedLanguage);
		localStorage.setItem("translation", "");

		dispatchSelections({
			type: "SET_LANGUAGE",
			payload: selectedLanguage as Languages,
		});
	};

	return (
		<select
			id="language-dropdown"
			onChange={handleLanguageChange}
			value={selections.languageName}
		>
			{languages.map((language) => (
				<option key={language} value={language}>
					{language}
				</option>
			))}
		</select>
	);
};
