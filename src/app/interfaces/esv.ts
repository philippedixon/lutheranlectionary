/**
 * The subset of the ESV API passage response that this app relies on.
 * See https://api.esv.org/docs/passage-html/
 */
export interface EsvPassageResponse {
	/**
	 * The query that was passed to the API.
	 */
	query: string;

	/**
	 * The canonical form of the passage reference.
	 */
	canonical: string;

	/**
	 * The formatted passages. Each entry is a block of HTML (or plain text,
	 * depending on the endpoint). Usually a single entry.
	 */
	passages: string[];
}
