import { Reading, TranslationBookChapter } from "@/app/interfaces";
import { ApiStrategy, ApiStrategyParams } from "@/lib/api/ApiStrategy";
import { fetchReading } from "@/app/utils/helpers";

export class HelloAOApiStrategy implements ApiStrategy {
	translationId: string;
	reading: Reading;

	constructor(params: ApiStrategyParams) {
		this.translationId = params.translationId;
		this.reading = params.reading;
	}

	async fetchData(): Promise<TranslationBookChapter[]> {
		return fetchReading(this.translationId, this.reading);
	}
}
