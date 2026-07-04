import { EsvPassageResponse } from "@/app/interfaces";

export class EsvResponseAdapter {
	static adapt(response: EsvPassageResponse): string[] {
		return response?.passages ?? [];
	}
}
