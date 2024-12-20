"use client";

import { useContext, useEffect, useState } from "react";
import { SelectionsContext } from "@/app/contexts";
import { usePathname } from "next/navigation";
import lectionary from "@/app/constants/lectionary";
import { Month } from "@/app/interfaces";
import { fetchChapter, getReadingContent, getReadingTitle } from "@/app/utils";
import {
	FormattedText,
	InlineHeading,
	InlineLineBreak,
	TranslationBookChapter,
} from "@/app/interfaces";
import { ContentType } from "@/app/enums";

const DayPage = () => {
	const path = usePathname();
	const selections = useContext(SelectionsContext);
	const [readings, setReadings] = useState<TranslationBookChapter[][]>([]);
	const [monthParameter, dayParameter] = path.split("/").slice(1);
	const monthIndex = parseInt(monthParameter) - 1;
	const dayIndex = parseInt(dayParameter) - 1;
	const month: Month = lectionary[monthIndex];
	const reading1 = month.days[dayIndex].reading_1;
	const reading2 = month.days[dayIndex].reading_2;
	const reading1Title = getReadingTitle(reading1);
	const reading2Title = getReadingTitle(reading2);
	const reading1Content = getReadingContent(reading1, readings[0]);
	console.log(reading1Content);
	const reading2Content = getReadingContent(reading2, readings[1]);
	console.log("2", reading2Content);

	useEffect(() => {
		const translation = "BSB";
		const book = "GEN";
		const chapter = 1;

		// Get Genesis 1 from the BSB translation
		fetch(
			`https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`
		)
			.then((request) => request.json())
			.then((chapter) => {
				console.log("Genesis 1 (BSB):", chapter);
			});
		const fetchReadings = async () => {
			const translation = selections.translationId ?? "";
			try {
				const readingResponse1 = await fetchChapter(translation, reading1);
				const readingResponse2 = await fetchChapter(translation, reading2);
				const readingResponses = [readingResponse1, readingResponse2];
				setReadings(readingResponses);
			} catch (error) {
				console.error("Error fetching readings:", error);
			}
		};

		fetchReadings();
	}, [reading1, reading2, selections.translationId]);

	// format and display responses
	useEffect(() => console.log(readings), [readings]);
	return (
		<div>
			<h1>
				{month.name} {dayParameter}
			</h1>
			<div>
				<h2>{reading1Title}</h2>
				{reading1Content.map((content) => {
					let node;
					if (content.type === ContentType.Verse) {
						node = content.content.map((text, index) => {
							if (typeof text === "string") {
								return (
									<span key={text}>
										<sup>{content.number}</sup>
										&nbsp;
										{text}
									</span>
								);
							} else if ((text as InlineLineBreak)?.lineBreak) {
								return <br key={`linebreak:${index}`} />;
							} else if ((text as InlineHeading)?.heading) {
								return (
									<h5 key={`heading:${index}`}>
										{(text as InlineHeading)?.heading}
									</h5>
								);
							} else if ((text as FormattedText)?.text) {
								const formattedText = text as FormattedText;
								// const tab = <span>&emsp;</span>;
								// const indent = tab.repeat(formattedText.poem ?? 0);
								const indent = "";
								let node = (
									<span key={formattedText.text}>
										{indent}
										{formattedText.text}
									</span>
								);
								if (formattedText.wordsOfJesus) {
									node = (
										<span key={formattedText.text}>
											<span>{node}</span>
										</span>
									);
								}
								return node;
							}
						});
					}

					return node;
				})}
			</div>
			<div>
				<h2>{reading2Title}</h2>
			</div>
		</div>
	);
};

export default DayPage;
