import { januaryReadings } from "./januaryReadings";
import { februaryReadings } from "./februaryReadings";
import { marchReadings } from "./marchReadings";
import { aprilReadings } from "./aprilReadings";
import { mayReadings } from "./mayReadings";
import { novemberReadings } from "./novemberReadings";
import { decemberReadings } from "./decemberReadings";

const lectionary = [
	januaryReadings,
	februaryReadings,
	marchReadings,
	aprilReadings,
	mayReadings,
	novemberReadings,
	decemberReadings,
];

export default lectionary;
// structure should just have bookId, not object, include month and day
