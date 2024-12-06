import { Selections } from "@/app/interfaces";
import { Languages } from "@/app/enums";

export type SelectionsAction =
	| { type: "SET_LANGUAGE"; payload: Languages }
	| { type: "SET_TRANSLATION"; payload: string };

export const selectionsReducer = (
	selections: Selections,
	action: SelectionsAction
): Selections => {
	console.log("reducer", selections, action);
	switch (action.type) {
		case "SET_LANGUAGE":
			return { languageName: action.payload };
		case "SET_TRANSLATION":
			return { ...selections, translationId: action.payload };
		default:
			return selections;
	}
};
