import { EsvPassageResponse } from "@/app/interfaces";

/**
 * The HTML block returned in `passages[0]` for `John 11:35` from the ESV
 * `/v3/passage/html/` endpoint (captured live). Note the `extra_text` reference
 * heading and `mp3link` audio link, which we suppress via request params, and
 * the `verse-num` / `copyright` classes we style.
 */
export const esvHtmlPassage =
	'<h2 class="extra_text">John 11:35 <small class="audio extra_text">(<a class="mp3link" href="https://audio.esv.org/david-cochran-heath/mq/43011035-43011035.mp3" title="John 11:35" type="audio/mpeg">Listen</a>)</small></h2>\n<p id="p43011035_01-1" class="virtual"><b class="verse-num" id="v43011035-1">35&nbsp;</b>Jesus wept.</p>\n<p>(<a href="http://www.esv.org" class="copyright">ESV</a>)</p>';

/**
 * A full ESV HTML endpoint response envelope.
 */
export const esvHtmlResponse: EsvPassageResponse = {
	query: "John 11:35",
	canonical: "John 11:35",
	passages: [esvHtmlPassage],
};

/**
 * A response whose `passages` spans multiple entries, to exercise joining.
 */
export const esvMultiPassageResponse: EsvPassageResponse = {
	query: "Psalm 1; Psalm 2",
	canonical: "Psalm 1; Psalm 2",
	passages: ["<p>First block.</p>", "<p>Second block.</p>"],
};

/**
 * One HTML block per chapter, as the strategy receives them when a reading
 * is fetched one chapter at a time. Mirrors the live markup: in-body
 * `<sup class="footnote">` markers, a trailing `div.footnotes` block whose
 * ids restart at 1 in every chapter, and the ESV copyright line. Chapter
 * three has no footnotes.
 */
const esvCopyrightLine =
	'<p>(<a href="http://www.esv.org" class="copyright">ESV</a>)</p>';

const esvFootnoteMarker = (n: number) =>
	`<sup class="footnote"><a class="fn" href="#f${n}-1" id="fb${n}-1">[${n}]</a></sup>`;

const esvFootnote = (n: number, ref: string, text: string) =>
	`<span class="footnote"><a href="#fb${n}-1" id="f${n}-1">[${n}]</a></span> <span class="footnote-ref">${ref}</span> <note class="translation">${text}</note>`;

export const esvChapterPassages = [
	[
		`<p>Chapter one.${esvFootnoteMarker(1)} More text.${esvFootnoteMarker(2)}</p>`,
		'<div class="footnotes extra_text">',
		"<h3>Footnotes</h3>",
		`<p>${esvFootnote(1, "1:4", "Hebrew <i>cutter</i>")}`,
		"<br />",
		`${esvFootnote(2, "1:8", "Or <i>virgin</i>")}`,
		"</p>",
		"</div>",
		esvCopyrightLine,
	].join("\n"),
	[
		`<p>Chapter two.${esvFootnoteMarker(1)}</p>`,
		'<div class="footnotes extra_text">',
		"<h3>Footnotes</h3>",
		`<p>${esvFootnote(1, "2:17", "Hebrew <i>face</i>")}`,
		"</p>",
		"</div>",
		esvCopyrightLine,
	].join("\n"),
	["<p>Chapter three.</p>", esvCopyrightLine].join("\n"),
];

/**
 * Builds a `fetch` mock for `/api/esv` that answers each `q` from `responses`.
 * A value may be a passages array, a function returning one (to vary across
 * retries), or `Error` to reject the request.
 */
type EsvRouteResponse = string[] | Error | (() => string[] | Error);

export const mockEsvFetchByQuery = (
	responses: Record<string, EsvRouteResponse>
): jest.Mock =>
	jest.fn((url: string) => {
		const q = new URL(url, "http://localhost").searchParams.get("q") ?? "";
		const entry = responses[q];
		const value = typeof entry === "function" ? entry() : entry;
		if (value instanceof Error) {
			return Promise.reject(value);
		}
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ passages: value ?? [] }),
		});
	});
