"use client";
// todo: convert to server component?
import { useContext, useEffect, useState } from "react";
import { SelectionsContext } from "@/app/contexts";
import { usePathname } from "next/navigation";
import lectionary from "@/app/constants/lectionary";
import { Month } from "@/app/interfaces";
import { fetchReading } from "@/app/utils";
import { TranslationBookChapter } from "@/app/interfaces";
import { ReadingPassage, VersePassage } from "@/app/components";

const DayPage = () => {
	const path = usePathname();
	const selections = useContext(SelectionsContext);
	const [firstReadingContent, setFirstReadingContent] = useState<
		TranslationBookChapter[][]
	>([]);
	const [secondReadingContent, setSecondReadingContent] = useState<
		TranslationBookChapter[][]
	>([]);
	const [monthParameter, dayParameter] = path.split("/").slice(1);
	const monthIndex = parseInt(monthParameter) - 1;
	const dayIndex = parseInt(dayParameter) - 1;
	const month: Month = lectionary[monthIndex];
	const firstReadingProperties = month.days[dayIndex].firstReading;
	const secondReadingProperties = month.days[dayIndex].secondReading;

	useEffect(() => {
		const fetchReadings = async () => {
			const translation = selections.translationId ?? "";
			// todo: parallelize calls and reassemble in order
			// add Promise.allSettled?
			try {
				const firstReadingResponses: TranslationBookChapter[][] = [];
				for (const reading of firstReadingProperties) {
					const response = await fetchReading(translation, reading);
					firstReadingResponses.push(response);
				}

				const secondReadingResponses: TranslationBookChapter[][] = [];
				for (const reading of secondReadingProperties) {
					const response = await fetchReading(translation, reading);
					secondReadingResponses.push(response);
				}

				setFirstReadingContent(firstReadingResponses);
				setSecondReadingContent(secondReadingResponses);
			} catch (error) {
				console.error("Error fetching readings:", error);
			}
		};

		fetchReadings();
	}, [
		firstReadingProperties,
		secondReadingProperties,
		selections.translationId,
	]);

	// format and display responses
	// useEffect(() => console.log("First READING", firstReadingContent));
	// useEffect(() => console.log("Second READING", secondReadingContent));
	return (
		<div>
			<h1>
				{month.name} {dayParameter}
			</h1>
			<div>
				<h2>First Reading</h2>
				{firstReadingContent.map((passageChapters, index) => {
					const readingInformation = firstReadingProperties[index];
					const key = `${passageChapters?.[0]?.book?.id}`;

					return (
						<div key={key}>
							{readingInformation.verses ? (
								<VersePassage
									passageChapter={passageChapters[0]}
									readingInformation={readingInformation}
								/>
							) : (
								<ReadingPassage
									passageChapters={passageChapters}
									readingInformation={readingInformation}
								/>
							)}
						</div>
					);
				})}
			</div>
			<div>
				<h2>Second Reading</h2>

				{secondReadingContent.map((passageChapters, index) => {
					const readingInformation = secondReadingProperties[index];
					const key = `${passageChapters?.[0]?.book?.id}`;
					return (
						<div key={`${key}:${index}`}>
							<ReadingPassage
								passageChapters={passageChapters}
								readingInformation={readingInformation}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default DayPage;
