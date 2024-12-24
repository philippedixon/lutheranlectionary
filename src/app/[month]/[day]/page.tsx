"use client";

import { useContext, useEffect, useState } from "react";
import { SelectionsContext } from "@/app/contexts";
import { usePathname } from "next/navigation";
import lectionary from "@/app/constants/lectionary";
import { Month } from "@/app/interfaces";
import { fetchChapters, getReadingContent, getReadingTitle } from "@/app/utils";
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
	const [readings, setReadings] = useState<TranslationBookChapter[][][]>([]);
	const [monthParameter, dayParameter] = path.split("/").slice(1);
	const monthIndex = parseInt(monthParameter) - 1;
	const dayIndex = parseInt(dayParameter) - 1;
	const month: Month = lectionary[monthIndex];
	const reading1 = month.days[dayIndex].reading_1;
	const reading2 = month.days[dayIndex].reading_2;

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
				const reading1Responses = [];
				for (const reading of reading1) {
					const response = await fetchChapters(translation, reading);
					reading1Responses.push(response);
				}

				const reading2Responses = [];
				for (const reading of reading2) {
					const response = await fetchChapters(translation, reading);
					reading2Responses.push(response);
				}
				// const readingResponse1 = await fetchChapters(translation, reading1);
				// const readingResponse2 = await fetchChapters(translation, reading2);
				const readingResponses = [reading1Responses, reading2Responses];
				setReadings(readingResponses);
			} catch (error) {
				console.error("Error fetching readings:", error);
			}
		};

		fetchReadings();
	}, [reading1, reading2, selections.translationId]);

	// format and display responses
	useEffect(() => console.log("READINGS", readings), [readings]);
	return (
		<div>
			<h1>
				{month.name} {dayParameter}
			</h1>
			<div>
				<h2>First Reading</h2>
				{reading1.map((reading, index) => {
					const title = getReadingTitle(reading);
					const chapters = getReadingContent(reading, readings?.[0]?.[index]);

					return (
						<div key={title}>
							<h3>{title}</h3>
							{chapters.map((chapter) => {
								let node;
								console.log("chapter", chapter);
								// fix poem formatting
								if (chapter.type === ContentType.Verse) {
									node = chapter.content.map((text, index) => {
										if (typeof text === "string") {
											return (
												<span key={text}>
													<sup>{chapter.number}</sup>
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
					);
				})}
			</div>
			<div>
				<h2>Second Reading</h2>
			</div>
		</div>
	);
};

export default DayPage;
