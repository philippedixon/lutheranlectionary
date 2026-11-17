import { BodyFont, FontSize } from "@/app/interfaces";

export const bodyFontClass = (bodyFont?: BodyFont): string =>
	bodyFont === "serif4" ? "font-source-serif" : "font-eb-garamond";

export const fontSizeClass = (fontSize?: FontSize): string => {
	switch (fontSize) {
		case "small":
			return "text-[17px]";
		case "large":
			return "text-[22px]";
		default:
			return "text-[19px]";
	}
};

export const headingSizeClass = (fontSize?: FontSize): string => {
	switch (fontSize) {
		case "small":
			return "text-[20px]";
		case "large":
			return "text-[26px]";
		default:
			return "text-[22px]";
	}
};
