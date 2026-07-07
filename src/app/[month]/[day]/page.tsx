"use client";
// todo: convert to server component?
import { useContext, useEffect, useState } from "react";
import { SelectionsContext } from "@/app/contexts";
import { usePathname } from "next/navigation";
import lectionary from "@/app/constants/lectionary";
import { Month, Reading } from "@/app/interfaces";
import { TranslationBookChapter } from "@/app/interfaces";
import {
	EsvPassage,
	ReadingPassage,
	ReadingTabs,
	VersePassage,
} from "@/app/components";
import { ApiStrategyFactory } from "@/lib/api/ApiStrategyFactory";

type PassageResult = TranslationBookChapter[] | string[];

const renderPassage = (
	passage: PassageResult,
	readingInformation: Reading,
	isEsv: boolean
) => {
	if (isEsv) {
		return (
			<EsvPassage
				html={(passage as string[])[0] ?? ""}
				readingInformation={readingInformation}
			/>
		);
	}

	const passageChapters = passage as TranslationBookChapter[];
	return readingInformation.verses ? (
		<VersePassage
			passageChapter={passageChapters[0]}
			readingInformation={readingInformation}
		/>
	) : (
		<ReadingPassage
			passageChapters={passageChapters}
			readingInformation={readingInformation}
		/>
	);
};

const DayPage = () => {
	const path = usePathname();
	const selections = useContext(SelectionsContext);
	const [firstReadingContent, setFirstReadingContent] = useState<
		PassageResult[]
	>([]);
	const [secondReadingContent, setSecondReadingContent] = useState<
		PassageResult[]
	>([]);
	const [activeTab, setActiveTab] = useState(0);
	const [monthParameter, dayParameter] = path.split("/").slice(1);
	const monthIndex = parseInt(monthParameter) - 1;
	const dayIndex = parseInt(dayParameter) - 1;
	const month: Month = lectionary[monthIndex];
	const firstReadingProperties = month.days[dayIndex].firstReading;
	const secondReadingProperties = month.days[dayIndex].secondReading;

	useEffect(() => {
		const fetchReadings = async () => {
			setFirstReadingContent([]);
			setSecondReadingContent([]);
			setActiveTab(0);
			const strategy = new ApiStrategyFactory().create({
				translationId: selections.translationId ?? "",
			});
			try {
				let secondReadingIndex = 0;
				const readingResponses: Promise<PassageResult>[] = [];
				for (const reading of firstReadingProperties) {
					readingResponses.push(strategy.fetchData(reading));
					secondReadingIndex++;
				}

				for (const reading of secondReadingProperties) {
					readingResponses.push(strategy.fetchData(reading));
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

	const isEsv = selections.translationId === "eng_esv";

	const readingProperties = [
		...firstReadingProperties,
		...secondReadingProperties,
	];
	const readingContent = [...firstReadingContent, ...secondReadingContent];
	const activePassage = readingContent[activeTab];
	const activeReading = readingProperties[activeTab];

	return (
		<div>
			<h1 className="font-cormorant font-semibold text-[38px] text-primary text-center mt-6 mb-2">
				{month.name} {dayParameter}
			</h1>
			<hr className="w-[60px] border-t border-gold mx-auto mb-7" />
			<ReadingTabs
				readings={readingProperties}
				activeIndex={activeTab}
				onSelect={setActiveTab}
			/>
			<div className="max-w-[720px] mx-auto space-y-8 px-6 flex flex-col items-center">
				{activePassage &&
					renderPassage(activePassage, activeReading, isEsv)}
			</div>
		</div>
	);
};

export default DayPage;
