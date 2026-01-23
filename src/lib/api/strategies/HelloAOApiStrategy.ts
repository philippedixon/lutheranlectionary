import { Reading, TranslationBookChapter } from "@/app/interfaces";
import { ApiStrategy, ApiStrategyParams } from "@/lib/api/ApiStrategy";
import { fetchReading } from "@/app/utils/helpers";

export class HelloAOApiStrategy implements ApiStrategy {
	translationId: string;

	constructor(params: ApiStrategyParams) {
		this.translationId = params.translationId;
	}

	async fetchData(reading: Reading): Promise<TranslationBookChapter[]> {
		return fetchReading(this.translationId, reading);
	}
}
