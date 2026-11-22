import lectionary from "@/app/constants/lectionary";
import { Day } from "@/app/interfaces";

const FEBRUARY_INDEX = 1;
const LEAP_DAY = 29;

const parseWholeNumber = (value: string | undefined) =>
	value && /^\d+$/.test(value) ? Number(value) : NaN;

// Resolves a /month/day URL to its lectionary day, or undefined when the URL
// isn't a real date. The lectionary has no leap day, so February 29 reuses
// February 28's readings.
export const findLectionaryDay = (
	monthParameter: string | undefined,
	dayParameter: string | undefined
): Day | undefined => {
	const monthIndex = parseWholeNumber(monthParameter) - 1;
	const dayOfMonth = parseWholeNumber(dayParameter);
	const month = lectionary[monthIndex];
	if (!month) {
		return undefined;
	}

	const isLeapDay = monthIndex === FEBRUARY_INDEX && dayOfMonth === LEAP_DAY;
	const dayIndex = isLeapDay ? month.days.length - 1 : dayOfMonth - 1;
	return month.days[dayIndex];
};
