"use client";
// todo: convert to server component?
import { useContext, useEffect, useState } from "react";
import { SelectionsContext } from "@/app/contexts";
import { usePathname } from "next/navigation";
import lectionary from "@/app/constants/lectionary";
import { Month } from "@/app/interfaces";
import { TranslationBookChapter } from "@/app/interfaces";
import { ReadingPassage, VersePassage } from "@/app/components";
import { ApiStrategyFactory } from "@/lib/api/ApiStrategyFactory";

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
			const strategy = new ApiStrategyFactory().create({
				translationId: selections.translationId ?? "",
			});
			// todo: parallelize calls and reassemble in order
			// add Promise.allSettled?
			try {
				// const firstReadingResponses: TranslationBookChapter[][] = [];
				let secondReadingIndex = 0;
				const readingResponses: Promise<TranslationBookChapter[]>[] = [];
				for (const reading of firstReadingProperties) {
					const response = strategy.fetchData(reading);
					// firstReadingResponses.push(response);
					readingResponses.push(response);
					secondReadingIndex++;
				}

				// const secondReadingResponses: TranslationBookChapter[][] = [];
				for (const reading of secondReadingProperties) {
					const response = strategy.fetchData(reading);
					// secondReadingResponses.push(response);
					readingResponses.push(response);
				}

				const allResponses = await Promise.all(readingResponses);
				setFirstReadingContent(allResponses.slice(0, secondReadingIndex));
				setSecondReadingContent(allResponses.slice(secondReadingIndex));
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

	return (
		<div>
			<h1 className="text-center text-2xl text-bold">
				{month.name} {dayParameter}
			</h1>
			<div className="max-w-2xl mx-auto space-y-8 px-6 flex flex-col items-center">
				<div>
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
		</div>
	);
};

export default DayPage;
