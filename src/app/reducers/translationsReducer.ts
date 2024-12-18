import { Translation } from "@/app/interfaces";

export interface TranslationsAction {
	payload: Translation[];
}

export const translationsReducer = (
	translations: Translation[],
	action: TranslationsAction
) => action.payload;
