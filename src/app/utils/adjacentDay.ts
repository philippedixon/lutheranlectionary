import lectionary from "@/app/constants/lectionary";

export const getAdjacentDay = (
	monthIndex: number,
	day: number,
	direction: 1 | -1
): { monthIndex: number; day: number } => {
	const newDay = day + direction;

	if (newDay < 1) {
		const prevMonthIndex = (monthIndex - 1 + 12) % 12;
		return {
			monthIndex: prevMonthIndex,
			day: lectionary[prevMonthIndex].days.length,
		};
	}

	if (newDay > lectionary[monthIndex].days.length) {
		return { monthIndex: (monthIndex + 1) % 12, day: 1 };
	}

	return { monthIndex, day: newDay };
};
