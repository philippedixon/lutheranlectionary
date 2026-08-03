import { selectionsReducer } from "@/app/reducers";
import { Selections } from "@/app/interfaces";
import { Languages } from "@/app/enums";

describe("selectionsReducer", () => {
	it("sets the body font on SET_BODY_FONT", () => {
		const selections: Selections = { languageName: Languages.English };

		const result = selectionsReducer(selections, {
			type: "SET_BODY_FONT",
			payload: "serif4",
		});

		expect(result.bodyFont).toBe("serif4");
	});

	it("preserves other selections when setting the body font", () => {
		const selections: Selections = {
			languageName: Languages.English,
			translationId: "eng_esv",
			fontSize: "large",
		};

		const result = selectionsReducer(selections, {
			type: "SET_BODY_FONT",
			payload: "garamond",
		});

		expect(result).toEqual({
			languageName: Languages.English,
			translationId: "eng_esv",
			fontSize: "large",
			bodyFont: "garamond",
		});
	});

	it("sets the font size on SET_FONT_SIZE", () => {
		const selections: Selections = { languageName: Languages.English };

		const result = selectionsReducer(selections, {
			type: "SET_FONT_SIZE",
			payload: "small",
		});

		expect(result.fontSize).toBe("small");
	});

	it("preserves other selections when setting the font size", () => {
		const selections: Selections = {
			languageName: Languages.English,
			translationId: "eng_esv",
			bodyFont: "serif4",
		};

		const result = selectionsReducer(selections, {
			type: "SET_FONT_SIZE",
			payload: "large",
		});

		expect(result).toEqual({
			languageName: Languages.English,
			translationId: "eng_esv",
			bodyFont: "serif4",
			fontSize: "large",
		});
	});

	it("leaves bodyFont/fontSize untouched for unrelated actions", () => {
		const selections: Selections = {
			languageName: Languages.English,
			bodyFont: "serif4",
			fontSize: "large",
		};

		const result = selectionsReducer(selections, {
			type: "SET_TRANSLATION",
			payload: "eng_kjv",
		});

		expect(result.bodyFont).toBe("serif4");
		expect(result.fontSize).toBe("large");
		expect(result.translationId).toBe("eng_kjv");
	});
});
