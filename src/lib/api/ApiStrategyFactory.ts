import { ApiStrategyParams } from "@/lib/api/ApiStrategy";
import { HelloAOApiStrategy } from "@/lib/api/strategies/HelloAOApiStrategy";
import { EsvApiStrategy } from "@/lib/api/strategies/EsvApiStrategy";

export class ApiStrategyFactory {
	create(strategyParams: ApiStrategyParams) {
		if (strategyParams.translationId === "eng_esv") {
			return new EsvApiStrategy();
		} else {
			return new HelloAOApiStrategy(strategyParams);
		}
	}
}
