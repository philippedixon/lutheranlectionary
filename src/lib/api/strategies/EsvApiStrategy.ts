import { Reading } from "@/app/interfaces";
import { ApiStrategy } from "@/lib/api/ApiStrategy";
import { EsvResponseAdapter } from "@/lib/api/adapters/EsvResponseAdapter";
import { getEsvQueries } from "@/lib/api/strategies/esvQueries";
import { getReadingTitle } from "@/app/utils/helpers";

const RETRY_ATTEMPTS = 2;

export class EsvApiStrategy implements ApiStrategy {
	translationId = "eng_esv";

	// All-or-nothing: a reading is never rendered with a missing chapter, so
	// any chapter that fails after its retry fails the whole reading.
	async fetchData(reading: Reading): Promise<string[]> {
		const queries = getEsvQueries(reading);
		try {
			const passagesPerChapter = await Promise.all(
				queries.map((q) => this.fetchPassagesWithRetry(q))
			);
			return passagesPerChapter.flat();
		} catch (error) {
			const title = getReadingTitle(reading);
			console.error(`Error fetching ESV passage for "${title}":`, error);
			throw error;
		}
	}

	private async fetchPassagesWithRetry(q: string): Promise<string[]> {
		let lastError: unknown;
		for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
			try {
				return await this.fetchPassages(q);
			} catch (error) {
				lastError = error;
			}
		}
		throw lastError;
	}

	private async fetchPassages(q: string): Promise<string[]> {
		const params = new URLSearchParams({ q });
		const response = await fetch(`/api/esv?${params}`);
		const passages = EsvResponseAdapter.adapt(await response.json());
		if (passages.length === 0) {
			throw new Error(`ESV returned no passages for "${q}"`);
		}
		return passages;
	}
}
