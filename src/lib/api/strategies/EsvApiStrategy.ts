import { Reading } from "@/app/interfaces";
import { ApiStrategy } from "@/lib/api/ApiStrategy";
import { EsvResponseAdapter } from "@/lib/api/adapters/EsvResponseAdapter";
import { getReadingTitle } from "@/app/utils/helpers";

export class EsvApiStrategy implements ApiStrategy {
	translationId = "eng_esv";

	async fetchData(reading: Reading): Promise<string[]> {
		const q = getReadingTitle(reading);
		try {
			const params = new URLSearchParams({ q });
			const response = await fetch(`/api/esv?${params}`);
			const json = await response.json();
			return EsvResponseAdapter.adapt(json);
		} catch (error) {
			console.error(`Error fetching ESV passage for "${q}":`, error);
			return [];
		}
	}
}
