import { ApiStrategyFactory } from "@/lib/api/ApiStrategyFactory";
import { HelloAOApiStrategy } from "@/lib/api/strategies/HelloAOApiStrategy";
import { BookId } from "@/app/enums";
import type { Reading } from "@/app/interfaces";

describe("ApiStrategyFactory", () => {
	it("returns HelloAOApiStrategy for non-ESV translations", () => {
		const params = {
			translationId: "BSB",
			reading: { bookId: BookId.Psalms } as Reading,
		};

		const factory = new ApiStrategyFactory();
		const strategy = factory.create(params);

		expect(strategy).toBeInstanceOf(HelloAOApiStrategy);
	});

	it.skip("returns ESVApiStrategy for eng_esv translation Id", () => {
		const params = {
			translationId: "eng_esv",
			reading: { bookId: BookId.Psalms } as Reading,
		};

		const factory = new ApiStrategyFactory();
		const strategy = factory.create(params);

		expect(strategy).toBeUndefined();
	});
});
