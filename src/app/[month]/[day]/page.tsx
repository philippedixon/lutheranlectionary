"use client";

import { useContext, useEffect, useState } from "react";
import { SelectionsContext } from "@/app/contexts";
import { usePathname } from "next/navigation";
import lectionary from "@/app/constants/lectionary";
import { Month } from "@/app/interfaces";
import { fetchReading } from "@/app/utils";
import { TranslationBookChapter } from "@/app/interfaces";
import { ReadingPassage } from "@/app/components";

const DayPage = () => {
	const path = usePathname();
	const selections = useContext(SelectionsContext);
	const [firstReading, setFirstReading] = useState<TranslationBookChapter[][]>(
		[]
	);
	const [secondReading, setSecondReading] = useState<
		TranslationBookChapter[][]
	>([]);
	const [monthParameter, dayParameter] = path.split("/").slice(1);
	const monthIndex = parseInt(monthParameter) - 1;
	const dayIndex = parseInt(dayParameter) - 1;
	const month: Month = lectionary[monthIndex];
	const reading1 = month.days[dayIndex].reading_1;
	const reading2 = month.days[dayIndex].reading_2;

	useEffect(() => {
		const fetchReadings = async () => {
			const translation = selections.translationId ?? "";
			try {
				const firstReadingResponses: TranslationBookChapter[][] = [];
				for (const reading of reading1) {
					const response = await fetchReading(translation, reading);
					firstReadingResponses.push(response);
				}

				const secondReadingResponses: TranslationBookChapter[][] = [];
				for (const reading of reading2) {
					const response = await fetchReading(translation, reading);
					secondReadingResponses.push(response);
				}

				setFirstReading(firstReadingResponses);
				setSecondReading(secondReadingResponses);
			} catch (error) {
				console.error("Error fetching readings:", error);
			}
		};

		fetchReadings();
	}, [reading1, reading2, selections.translationId]);

	// format and display responses
	useEffect(() => console.log("First READING", firstReading));
	useEffect(() => console.log("Second READING", secondReading));
	return (
		<div>
			<h1>
				{month.name} {dayParameter}
			</h1>
			<div>
				<h2>First Reading</h2>
				{firstReading.map((passageChapters, index) => {
					const readingInfo = reading1[index];
					const key = `${passageChapters?.[0]?.book?.id}`;

					return (
						<div key={key}>
							<ReadingPassage
								passageChapters={passageChapters}
								readingInfo={readingInfo}
							/>
						</div>
					);
				})}
			</div>
			<div>
				<h2>Second Reading</h2>

				{secondReading.map((passageChapters, index) => {
					const readingInfo = reading2[index];
					const key = `${passageChapters?.[0]?.book?.id}`;
					return (
						<div key={`${key}:${index}`}>
							<ReadingPassage
								passageChapters={passageChapters}
								readingInfo={readingInfo}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default DayPage;
