import { Reading, TranslationBookChapter } from "@/app/interfaces";

export interface ApiStrategyParams {
	translationId: string;
	reading: Reading;
}

export interface ApiStrategy {
	translationId: string;
	reading: Reading;
	fetchData(): Promise<TranslationBookChapter[] | string[]>;
}
