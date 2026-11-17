// Each ESV passage block is self-contained: it ends in its own "(ESV)"
// copyright line and carries its own footnotes block whose ids restart at 1.
// When a reading spans several chapters we show one continuous block: the
// copyright line appears once, and the footnotes are gathered into a single
// block after the last chapter, labelled by chapter, with the markers
// renumbered so ids stay unique and links resolve to the right note.
const ESV_COPYRIGHT_LINE =
	/\s*<p>\(<a[^>]*class="copyright"[^>]*>ESV<\/a>\)<\/p>\s*$/;
const ESV_FOOTNOTES_BLOCK = /<div class="footnotes[^"]*">[\s\S]*?<\/div>\s*/;
const ESV_FOOTNOTES_BODY = /<h3>Footnotes<\/h3>\s*([\s\S]*?)\s*<\/div>/;
const ESV_FOOTNOTE_ANCHOR = /(href="#|id=")(fb?)(\d+)-(\d+)"/g;
const ESV_FOOTNOTE_MARKER = /\[(\d+)\]/g;

interface ChapterParts {
	body: string;
	footnotes: string | null;
	footnoteCount: number;
}

const splitChapter = (passage: string): ChapterParts => {
	const withoutCopyright = passage.replace(ESV_COPYRIGHT_LINE, "");
	const block = withoutCopyright.match(ESV_FOOTNOTES_BLOCK)?.[0] ?? null;
	const footnotes = block?.match(ESV_FOOTNOTES_BODY)?.[1] ?? null;
	const footnoteCount = footnotes
		? [...footnotes.matchAll(/class="footnote"/g)].length
		: 0;
	return {
		body: block ? withoutCopyright.replace(block, "") : withoutCopyright,
		footnotes,
		footnoteCount,
	};
};

// Offsets every footnote number in `html` so marker labels and anchor ids
// continue the running sequence rather than restarting at 1 each chapter.
const renumberFootnotes = (html: string, offset: number) =>
	html
		.replace(
			ESV_FOOTNOTE_ANCHOR,
			(_, attribute, prefix, number, suffix) =>
				`${attribute}${prefix}${Number(number) + offset}-${suffix}"`
		)
		.replace(ESV_FOOTNOTE_MARKER, (_, number) => `[${Number(number) + offset}]`);

export const stitchEsvPassages = (
	passages: string[],
	firstChapterNumber = 1
): string => {
	if (passages.length <= 1) {
		return passages[0] ?? "";
	}

	const bodies: string[] = [];
	const footnoteSections: string[] = [];
	let footnoteOffset = 0;

	passages.forEach((passage, index) => {
		const { body, footnotes, footnoteCount } = splitChapter(passage);
		bodies.push(renumberFootnotes(body, footnoteOffset));
		if (footnotes) {
			footnoteSections.push(
				`<h4 class="footnotes-chapter">Chapter ${firstChapterNumber + index}</h4>\n${renumberFootnotes(footnotes, footnoteOffset)}`
			);
		}
		footnoteOffset += footnoteCount;
	});

	const copyright = passages[passages.length - 1].match(ESV_COPYRIGHT_LINE)?.[0].trim();
	const footnotesBlock =
		footnoteSections.length > 0
			? `<div class="footnotes extra_text">\n<h3>Footnotes</h3>\n${footnoteSections.join("\n")}\n</div>`
			: null;

	return [...bodies, footnotesBlock, copyright].filter(Boolean).join("\n");
};
