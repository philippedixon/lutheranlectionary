import { ApiStrategyParams } from "@/lib/api/ApiStrategy";
import { HelloAOApiStrategy } from "@/lib/api/strategies/HelloAOApiStrategy";

export class ApiStrategyFactory {
	create(strategyParams: ApiStrategyParams) {
		if (strategyParams.translationId === "eng_esv") {
			// Placeholder for future ESV strategy
			return new HelloAOApiStrategy(strategyParams);
		} else {
			return new HelloAOApiStrategy(strategyParams);
		}
	}
}
