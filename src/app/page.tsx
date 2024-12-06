"use client";

import { useContext, useEffect } from "react";
import { SelectionsContext } from "./contexts";
import { Translation } from "./interfaces/helloao";

export default function Home() {
	const selections = useContext(SelectionsContext);

	useEffect(() => {
		const translation = "eng_abt";
		fetch(`https://bible.helloao.org/api/${translation}/books.json`)
			.then((request) => request.json())
			.then((books) => {
				console.log("The asv has the following books:", books);
			});
		fetch(`https://bible.helloao.org/api/available_translations.json`)
			.then((request) => request.json())
			.then((availableTranslations) => {
				const eng = availableTranslations?.translations?.filter(
					(translation: Translation) =>
						translation.languageEnglishName === "English"
				);
				console.log("The API has the following translations:", eng);
			});
	}, [selections]);

	return (
		<div>
			<h1>Lutheran Lectionary</h1>
		</div>
	);
}
