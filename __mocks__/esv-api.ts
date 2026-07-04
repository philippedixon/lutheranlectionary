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
