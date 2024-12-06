import { Translation } from "@/app/interfaces";

export interface TranslationsAction {
	type: "SET_TRANSLATIONS";
	payload: Translation[];
}

export const translationsReducer = (
	translations: Translation[],
	action: TranslationsAction
) => {
	switch (action.type) {
		case "SET_TRANSLATIONS":
			return action.payload;
		default:
			return translations;
	}
};
