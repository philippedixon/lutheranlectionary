import { Reading, TranslationBookChapter } from "@/app/interfaces";

export interface ApiStrategyParams {
	translationId: string;
}

export interface ApiStrategy {
	translationId: string;
	fetchData(reading: Reading): Promise<TranslationBookChapter[] | string[]>;
}
