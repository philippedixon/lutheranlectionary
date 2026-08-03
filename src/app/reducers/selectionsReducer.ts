import { BodyFont, FontSize, Selections } from "@/app/interfaces";
import { Languages } from "@/app/enums";

export type SelectionsAction =
	| { type: "SET_LANGUAGE"; payload: Languages }
	| { type: "SET_TRANSLATION"; payload: string }
	| { type: "SET_SELECTIONS"; payload: Selections }
	| { type: "SET_BODY_FONT"; payload: BodyFont }
	| { type: "SET_FONT_SIZE"; payload: FontSize };

export const selectionsReducer = (
	selections: Selections,
	action: SelectionsAction
): Selections => {
	switch (action.type) {
		case "SET_LANGUAGE":
			return { languageName: action.payload };
		case "SET_TRANSLATION":
			return { ...selections, translationId: action.payload };
		case "SET_SELECTIONS": {
			return { ...action.payload };
		}
		case "SET_BODY_FONT":
			return { ...selections, bodyFont: action.payload };
		case "SET_FONT_SIZE":
			return { ...selections, fontSize: action.payload };
		default:
			return selections;
	}
};
