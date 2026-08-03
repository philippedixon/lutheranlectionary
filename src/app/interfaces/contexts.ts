import { Languages } from "@/app/enums";

export type BodyFont = "garamond" | "serif4";
export type FontSize = "small" | "medium" | "large";

export interface Selections {
	languageName?: Languages | string;
	translationId?: string;
	bodyFont?: BodyFont;
	fontSize?: FontSize;
}
