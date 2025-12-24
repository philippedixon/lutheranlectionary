import { Reading } from "@/app/interfaces";
import { ApiStrategyParams } from "@/lib/api/ApiStrategy";
import { HelloAOApiStrategy } from "@/lib/api/strategies/HelloAOApiStrategy";

export enum ApiStrategies {
	ESV = "ESV",
	HELLOAO = "HELLOAO",
}

export class ApiStrategyFactory {
	translationId: string;
	reading: Reading;

	constructor(strategyParams: ApiStrategyParams) {
		this.translationId = strategyParams.translationId;
		this.reading = strategyParams.reading;
	}

	create(strategy: ApiStrategies) {
		switch (strategy) {
			case ApiStrategies.HELLOAO:
				return new HelloAOApiStrategy({
					translationId: this.translationId,
					reading: this.reading,
				});

			default:
				throw new Error(`Unsupported API strategy: ${strategy}`);
		}
	}
}
