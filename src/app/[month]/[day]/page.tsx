"use client";

import { usePathname } from "next/navigation";
import { lectionary, Month } from "@/app/constants";
import { getReadingDisplay } from "@/app/utils";

const DayPage = () => {
	const path = usePathname();
	const [monthParameter, dayParamter] = path.split("/").slice(1);
	const monthIndex = parseInt(monthParameter) - 1;
	const dayIndex = parseInt(dayParamter) - 1;
	const month: Month = lectionary[monthIndex];
	const reading1Display = getReadingDisplay(month.days[dayIndex].reading_1);
	const reading2Display = getReadingDisplay(month.days[dayIndex].reading_2);

	// use books and chapters to make requests and make requests to API
	// format and display responses

	return (
		<div>
			<h1>
				{month.name} {dayParamter}
			</h1>
			<h2>{reading1Display}</h2>
			<h2>{reading2Display}</h2>
		</div>
	);
};

export default DayPage;
