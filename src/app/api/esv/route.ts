import { NextResponse } from "next/server";
import { EsvPassageResponse } from "@/app/interfaces";

const ESV_PASSAGE_HTML_URL = "https://api.esv.org/v3/passage/html/";

// We render our own reading title, so suppress the ESV reference heading and its
// audio link; keep verse numbers and section headings (restyled to match the app).
const ESV_PARAMS: Record<string, string> = {
	"include-passage-references": "false",
	"include-audio-link": "false",
	"include-verse-numbers": "true",
	"include-headings": "true",
};

// ESV passage text is static; cache aggressively to protect the daily quota.
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

const emptyPassages = () => NextResponse.json({ passages: [] as string[] });

export async function GET(request: Request) {
	const query = new URL(request.url).searchParams.get("q");
	if (!query) {
		console.error("Missing 'q' query parameter for ESV request");
		return emptyPassages();
	}

	const apiKey = process.env.ESV_API_KEY;
	if (!apiKey) {
		console.error("ESV_API_KEY is not configured");
		return emptyPassages();
	}

	const url = new URL(ESV_PASSAGE_HTML_URL);
	url.searchParams.set("q", query);
	for (const [key, value] of Object.entries(ESV_PARAMS)) {
		url.searchParams.set(key, value);
	}

	try {
		const response = await fetch(url.toString(), {
			headers: { Authorization: `Token ${apiKey}` },
			next: { revalidate: REVALIDATE_SECONDS },
		});

		if (!response.ok) {
			const text = await response.text();
			console.error(
				`Failed to fetch ESV passage (${response.status}):`,
				text
			);
			return emptyPassages();
		}

		const json = (await response.json()) as EsvPassageResponse;
		return NextResponse.json({ passages: json.passages ?? [] });
	} catch (error) {
		console.error(`Error fetching ESV passage for "${query}":`, error);
		return emptyPassages();
	}
}
